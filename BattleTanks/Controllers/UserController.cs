using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using BattleTanks.Core.DTOs;
using BattleTanks.Core.Extensions;
using BattleTanks.Core.IService;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BattleTanks.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserService _userService;
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        private readonly IEmailService _emailService;

        public UserController(
            IUserService userSrv,
            IAuthService authSrv,
            IMapper mapper,
            IMediator mediator,
            IEmailService emailService
        )
        {
            _userService = userSrv;
            _authService = authSrv;
            _mapper = mapper;
            _emailService = emailService;
            _mediator = mediator;
        }
        
        [HttpPost("[action]")]
        public async Task<IActionResult> ChangeAvatar([FromForm]AvatarDto model)
        {
            var newAva = model.Photo;
            if (newAva == null) return BadRequest("Image not found");
            var user = GetCurrentUser(HttpContext.User);
            if (user == null)
            {
                return BadRequest();
            }

            newAva = HttpContext.Request.Form.Files[0];

            var result = await _userService.ChangeAvatar(user.Id, newAva);
            if (!result.Successed)
            {
                return BadRequest(result.Message);
            }
            var updatedPhoto = _userService.GetById(user.Id).Photo.Thumb.ToRenderablePictureString();
            return Ok(updatedPhoto);
        }

        private UserDto GetCurrentUser(ClaimsPrincipal userClaims) => _authService.GetCurrentUser(userClaims);

        /// <summary>
        /// This method have to return UsersData and Columns what draw
        /// </summary>]
        /// <returns></returns>
        /// <response code="200">Return  List UserDTO</response>
        /// <response code="400">Return failed</response>
        [HttpGet("[action]")]      
        public IActionResult All()
        {
            var res = new Dictionary<string, object>()
            {
                {
                    "columns", new List<string>{"Id", "Nickname", "Email", "Gender", "Role"}
                },
                {
                    "result", _userService.GetUsers()
                }
            };
                                                     
            return Ok(res);
        }

        [HttpGet("[action]")]
        public IActionResult Get([FromQuery]Guid id)
        {
            var res = _mapper.Map<UserInfo>(_userService.GetById(id));
            res.Friends = _userService.GetFriends(id);
            return Ok(res);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Follow([FromQuery] Guid userId)
        {
            var currentUser = this.GetCurrentUser(HttpContext.User);
            var res = await _userService.Follow(new FriendDto()
            {
                For = userId,
                Who = currentUser.Id
            });
            if (res.Successed)
            {
                return Ok();
            }

            return BadRequest(res.Message);
        }
    }
}