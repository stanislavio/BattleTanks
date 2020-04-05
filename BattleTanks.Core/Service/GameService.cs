using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using BattleTanks.Core.DTOs;
using BattleTanks.Core.Infrastructure;
using BattleTanks.Core.IService;
using BattleTanks.DB.Entities;
using BattleTanks.DB.IRepo;

namespace BattleTanks.Core.Service
{
    public class GameService : IGameService
    {
        private readonly IUoW _unitOfWork;
        private readonly IMapper _mapper;

        public GameService(
            IUoW unitOfWork,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<OperationResult> CreateGame(GameLoadDto model)
        {
            var currentOpenGame = _unitOfWork.UserGame.Get("Game").FirstOrDefault(x => x.TankerId == model.UserId && x.Author && x.Game.Finished == DateTime.MinValue);
            if (currentOpenGame != null) return new OperationResult(false, "You have not finished game", "");
            var map = _unitOfWork.MapRepo.Get(model.MapId.Value);
            if (map == null) return new OperationResult(false, "Map not Found", "");
            var tank = _unitOfWork.TankRepo.Get(model.TankId);
            if(tank == null) return new OperationResult(false, "Tank not Found", "");
            var game = _unitOfWork.GameRepo.Insert(new Game()
            {
                Map = map
            });
            var gamer = _unitOfWork.UserGame.Insert(new UserGame()
            {
                TankerId = model.UserId,
                Author = true,
                Game = game,
                Tank = tank,
                Coordinates = "{\"x\": -1, \"y\": -1}"
            });
            await _unitOfWork.SaveAsync();
            return new OperationResult(true, "",game.Id.ToString());
        }

        public IEnumerable<TankerDto> GetPlayers(Guid gameId)
        {                            
            var res = _unitOfWork.UserGame.Get("Tanker.Photo,Tank.Icon,Tank.Bullet.Photo").Where(x => x.GameId == gameId);

            return _mapper.Map<IEnumerable<TankerDto>>(res.AsEnumerable());
        }

        public IEnumerable<GameDto> GetGames()
        {
            var res = _unitOfWork.GameRepo.Get("Map.Photos.Icon").ToList();
            return _mapper.Map<IEnumerable<GameDto>>(res);
        }

        public IEnumerable<GamePreviewDto> FindGame()
        {                             
            var games = _unitOfWork.UserGame.Get("Tanker.Photo,Game.Users").Where(x => x.Author);
            return _mapper.Map<IEnumerable<GamePreviewDto>>(games.AsEnumerable());
        }

        public GameDto GetGameInfo(Guid gameId)
        {
            return _mapper.Map<GameDto>(_unitOfWork.GameRepo.Get("Users,Map.Photos.Icon").FirstOrDefault(x => x.Id == gameId));
        }

        public async Task<OperationResult> SavePlayersInfo(List<PlayerInfoDto> model)
        {
            foreach (var item in model)
            {
                var player = _unitOfWork.UserGame.Get("Game").FirstOrDefault(x => x.TankerId == item.Id && x.Game.Finished == DateTime.MinValue);
                if (player == null) return new OperationResult();
                player.Coordinates = item.Position;
            }

            await _unitOfWork.SaveAsync();
            return new OperationResult(true);
        }

        public async Task<OperationResult> SaveCurrentMap(SaveGameInfo model)
        {

            var res = _unitOfWork.GameRepo.Get().FirstOrDefault(x => x.Id == model.Id);
            if (res == null) return new OperationResult(false, "Game not found", "");
            res.CurrentMapCoordinates = model.CurrentMap;

            await _unitOfWork.SaveAsync();
            return  new OperationResult(true);
        }

        public async Task<OperationResult> JoinToGame(GameLoadDto model)
        {
            var tank = _unitOfWork.TankRepo.Get().FirstOrDefault(x => x.Id == model.TankId);
            if (tank == null) return new OperationResult(false, "Tank not found","");

            var game = _unitOfWork.GameRepo.Get("Users").FirstOrDefault(x => x.Id == model.GameId.Value);
            if (game == null) return new OperationResult(false, "Game not found", "");
            if(game.Finished != DateTime.MinValue || game.Users.Count > 1) return  new OperationResult(false, "You can't join to this game", "");

            var userGame = _unitOfWork.UserGame.Get("Game")
                .FirstOrDefault(x => x.TankerId == model.UserId && x.Game.Finished == DateTime.MinValue);

            if (userGame != null)
            {
                return new OperationResult(false, "You already play", "");
            }

            var res = _unitOfWork.UserGame.Insert(new UserGame()
            {
                TankerId = model.UserId,
                Coordinates = "{\"x\": -1, \"y\": -1}",
                GameId = model.GameId,
                TankId = model.TankId
            });
            await _unitOfWork.SaveAsync();
            return new OperationResult(true);
        }

        public async Task<OperationResult> SavePlayerOnline(Guid playerId, bool online)
        {
            var player = _unitOfWork.UserGame.Get("Game")
                .FirstOrDefault(x => x.TankerId == playerId && x.Game.Finished == DateTime.MinValue);
            if (player == null) return new OperationResult(false);
            player.Online = online;
            await _unitOfWork.SaveAsync();

            return new OperationResult(true);
        }

        public List<string> GetEnemies(Guid playerId)
        {
            var player = _unitOfWork.UserGame.Get("Game")
                .FirstOrDefault(x => x.TankerId == playerId && x.Game.Finished == DateTime.MinValue);
            var enemies = _unitOfWork.UserGame.Get("")
                .Where(x => x.GameId == player.GameId && x.TankerId != player.TankerId);
            return enemies.Select(x => x.TankerId.ToString()).ToList();
        }

        public async Task<bool> CanStartGame(Guid gameId)
        {
            var res = _unitOfWork.UserGame.Get("").Where(x => x.Online && x.GameId == gameId);
            if (res.Count() == 2)
            {
                var game = _unitOfWork.GameRepo.Get().FirstOrDefault(x => x.Id == gameId);
                if(game.Started == DateTime.MinValue) { 
                    game.Started = DateTime.Now;
                    await _unitOfWork.SaveAsync();
                }
                return true;
            }    
            return false;
        }

        public async Task<OperationResult> KillPlayer(KillDto model)
        {
            var userGame = _unitOfWork.UserGame.Get().FirstOrDefault(x => x.GameId == model.GameId && x.TankerId == model.PlayerId);

            if(userGame == null) return new OperationResult(false, "Tanker not found", "");

            userGame.DiedCount++;

            if (userGame.DiedCount == 5)
            {
                var game = _unitOfWork.GameRepo.Get().FirstOrDefault(x => x.Id == model.GameId);
                game.Finished = DateTime.Now;
            }

            await _unitOfWork.SaveAsync();

            return new OperationResult(false);
        }
    }
}
