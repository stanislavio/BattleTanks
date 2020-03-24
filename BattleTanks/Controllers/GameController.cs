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
        public async Task<IActionResult> CreateGame([FromBody]GameLoadDto model)
        {
            var currentUser = GetCurrentUser(HttpContext.User);
            if (currentUser == null)
                return BadRequest();
            model.UserId = currentUser.Id;
            var res = await _gameService.CreateGame(model);
            if(res.Successed)
                return Ok(res.Property);
            return BadRequest(res.Message);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> JoinToGame([FromBody]GameLoadDto model)
        {
            var currentUser = GetCurrentUser(HttpContext.User);
            if (currentUser == null)
                return BadRequest();
            model.UserId = currentUser.Id;
            var res = await _gameService.JoinToGame(model);
            if (res.Successed)
                return Ok();
            return BadRequest(res.Message);
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
        public IActionResult FindGames()
        {
            return Ok(_gameService.FindGame());
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> SaveGameInfo([FromBody]List<PlayerInfoDto> model)
        {
            var res = await _gameService.SavePlayersInfo(model);
            if(res.Successed)
                return Ok();
            return BadRequest(res.Message);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> SaveGameMapInfo([FromBody] SaveGameInfo model)
        {
            var res = await _gameService.SaveCurrentMap(model);
            if (res.Successed)
                return Ok();
            return BadRequest(res.Message);
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