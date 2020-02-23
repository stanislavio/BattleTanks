using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BattleTanks.Core.DTOs;
using BattleTanks.Core.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BattleTanks.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class TanksController : ControllerBase
    {

        private readonly ITankService _tankService;


        public TanksController(
            ITankService tankService
        )
        {
            _tankService = tankService;
        }

        [HttpGet("[action]")]
        public IActionResult Get([FromQuery] Guid id)
        { 
            return Ok(_tankService.Get(id));
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> CreateOrUpdate([FromForm]TankDto model)
        {
            var res = await _tankService.CreateOrUpdate(model);
            if (res.Successed)
            {
                return Ok();
            }

            return BadRequest(res.Message);
        }



    }
}