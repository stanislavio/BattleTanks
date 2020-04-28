using System;
using System.Threading.Tasks;
using AutoMapper;
using BattleTanks.Core.DTOs;
using BattleTanks.Core.IService;     
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BattleTanks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {

        private readonly IUserService _userService;
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;
        private readonly IGameService _gameService;

        public AuthenticationController(
            IUserService userSrv,
            IMapper mapper,
            IAuthService authSrv,
            IGameService gameService
            )
        {
            _userService = userSrv;
            _mapper = mapper;
            _authService = authSrv;
            _gameService = gameService;
        }
        
        [AllowAnonymous]
        [HttpPost("[action]")]
        [Produces("application/json")]
        public async Task<IActionResult> Login([FromBody]LoginDto model)
        {
            var result = await _authService.Authenticate(model.Email, model.Password);
            if (!result.Successed)
            {
                return BadRequest(result.Message);
            }

            var user = _userService.GetByEmailOrNickname(model.Email);

            var userInfo = _mapper.Map<UserInfo>(user);
            userInfo.Token = result.Message;
            userInfo.Friends = _userService.GetFriends(userInfo.Id);
            userInfo.Stats = _gameService.GetStats(userInfo.Id);

            return Ok(userInfo);   
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<IActionResult> Register(RegisterDto authRequest)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}
            var user = _mapper.Map<RegisterDto, UserDto>(authRequest);              

            var result = await _userService.Create(user);
            if (!result.Successed)
            {
                return BadRequest(result.Message);
            }
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("verify/{userid}/{token}")]
        public async Task<IActionResult> EmailConfirm(string userid, string token)
        {
            var cache = new CacheDto { Token = token };

            if (!Guid.TryParse(userid, out cache.UserId))
            {
                return BadRequest("Validation failed");
            }

            var result = await _userService.ConfirmEmail(cache);

            if (!result.Successed)
            {
                return BadRequest(result.Message);
            }

            var user = _userService.GetById(cache.UserId);

            var userInfo = _mapper.Map<UserDto, UserInfo>(user);
            userInfo.Token = _authService.FirstAuthenticate(user).Message;
            userInfo.AfterEmailConfirmation = true;

            return Ok(userInfo);
        }

        [Authorize]
        [HttpPost("loginToken")]
        public IActionResult Login()
        {
            var user = _authService.GetCurrentUser(HttpContext.User);
            var userInfo = _mapper.Map<UserInfo>(user);
            userInfo.Friends = _userService.GetFriends(userInfo.Id);
            return Ok(userInfo);
        }

        /// <summary>
        /// This method is for change password
        /// </summary>
        /// <param name="changePasswordDto">Required</param>
        /// <returns></returns>
        /// <response code="200">Password change successful</response> 
        /// <response code="400">If as-sword change process failed</response>
        [HttpPost("[action]")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto changePasswordDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = _authService.GetCurrentUser(HttpContext.User);

            var result = await _authService.ChangePasswordAsync(user, changePasswordDto.OldPassword, changePasswordDto.NewPassword);

            if (!result.Successed)
            {
                return BadRequest(result.Message);
            }
            return Ok();
        }
    }
}