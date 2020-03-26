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

        public async Task GameStarted(Guid gameId)
        {
            var users = _gameService.GetPlayers(gameId);
            await Clients.Users(users.Select(x => x.UserInfo.Id.ToString()).ToList()).SendAsync("ReceiveMsg", users);
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
