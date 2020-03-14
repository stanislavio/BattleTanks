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


        /// <summary>
        /// 
        /// </summary>
        /// <param name="tankService"></param>
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

        /// <summary>
        /// This method have to return TankDto
        /// </summary>
        /// <param name="filter">Required</param>
        /// <returns></returns>
        /// <response code="200">Return  Tanks</response>
        /// <response code="400">Return failed</response>
        [HttpGet("[action]")]
        public IActionResult All()
        {
            return Ok(_tankService.All());
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateOrUpdate([FromForm]TankLoadDto model)
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