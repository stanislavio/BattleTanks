using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BattleTanks.Core.DTOs;
using BattleTanks.Core.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BattleTanks.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {

        private readonly IAuthService _authService;
        private readonly IGameService _gameService;
        /// <summary>
        /// 
        /// </summary>
        public GameController(
            IAuthService authService,
            IGameService gameService)
        {
            _authService = authService;
            _gameService = gameService;
        }

        private UserDto GetCurrentUser(ClaimsPrincipal userClaims) => _authService.GetCurrentUser(userClaims);

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> CreateGame(GameLoadDto model)
        {
            var currentUser = GetCurrentUser(HttpContext.User);
            if (currentUser == null)
                return BadRequest();
            model.UserId = currentUser.Id;
            var res = await _gameService.CreateGame(model);
            if(res.Successed)
                return Ok(res.Property);
            return BadRequest();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="gameId"></param>
        /// <returns></returns>
        [Authorize]
        [HttpGet("[action]")]
        public IActionResult GetPlayers([FromQuery] Guid gameId)
        {
            return Ok(_gameService.GetPlayers(gameId));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet("[action]")]
        public IActionResult GetGames()
        {
            return Ok(_gameService.GetGames());
        }


        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpGet("[action]")]
        public IActionResult GetGameInfo([FromQuery]Guid gameId)
        {
            return Ok(_gameService.GetGameInfo(gameId));
        }





    }
}