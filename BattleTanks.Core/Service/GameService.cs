using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
            var map = _unitOfWork.MapRepo.Get(model.MapId);
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
                Coordinates = "I don't know"
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

        public GameDto GetGameInfo(Guid gameId)
        {
            return _mapper.Map<GameDto>(_unitOfWork.GameRepo.Get("Map.Photos.Icon").FirstOrDefault(x => x.Id == gameId));
        }

    }
}
