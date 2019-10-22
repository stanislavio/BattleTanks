using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using BattleTanks.Core.DTOs;
using BattleTanks.Core.Extensions;
using BattleTanks.Core.IService;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BattleTanks.Controllers
{
    [Route("api/[controller]")]
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
        public async Task<IActionResult> ChangeAvatar([FromForm]IFormFile newAva)
        {
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

    }
}