using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BattleTanks.Core.DTOs;
using BattleTanks.Core.IService;
using Microsoft.AspNetCore.SignalR;

namespace BattleTanks.Core.GameHub
{
    public class GameRoom : Hub 
    {
        private readonly IAuthService _authService;
        private readonly IUserService _userService;
        private readonly IGameService _gameService;

        public GameRoom
        (
            IAuthService authService,
            IUserService userService,
            IGameService gameService
        )
        {
            _authService = authService;
            _userService = userService;
            _gameService = gameService;
        }

        public async Task OnConnect(Guid gameId, Guid userId)
        {                                                                

            await _gameService.SavePlayerOnline(userId, true);

            var enemies = _gameService.GetEnemies(userId);  

            if(_gameService.CanStartGame(gameId))
                await Clients.Users(_gameService.GetPlayers(gameId).Select(x => x.UserInfo.Id.ToString()).ToList()).SendAsync("StartGame", userId);


            await Clients.Users(enemies.Select(x => x.ToLower()).ToList()).SendAsync("ReceiveOnline", userId);
        }

        public async Task OnDisconnect(Guid userId)
        { 
            await _gameService.SavePlayerOnline(userId, false);

            var enemies = _gameService.GetEnemies(userId);

            await Clients.Users(enemies.Select(x => x.ToLower()).ToList()).SendAsync("ReceiveOffline", userId);
        }

        public async Task Shoot(ShootDto model)
        {                
            await Clients.Users(model.Players.Split(",")).SendAsync("ReceiveShoot", model);
        }

        public async Task Move(MoveDto model)
        {
            await Clients.Users(model.Players.Split(",")).SendAsync("ReceiveMove", model);
        }



    }
}
