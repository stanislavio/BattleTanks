using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BattleTanks.Core.DTO;
using BattleTanks.Core.IService;
using BattleTanks.DB.IRepo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BattleTanks.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class MapController : ControllerBase
    {                                       
        private readonly IMapService _mapService;

        public MapController(    
            IMapService mapService
        )
        {                              
            _mapService = mapService;
        }

        [HttpGet("[action]")]
        public IActionResult All()
        {
            return Ok(_mapService.AllMap());
        }

        [HttpGet("[action]")]
        public IActionResult Get([FromQuery]Guid id)
        {
            return Ok(_mapService.Get(id));
        }

        [HttpPost("[action]")]
        [Authorize(Roles="Admin")]
        public async Task<IActionResult> CreateOrUpdate([FromForm]MapDto model)
        {
            var result = await _mapService.CreateOrUpdate(model);
            if (result.Successed)
                return Ok(result.Property);
            return BadRequest("values not valid");
        }
    }
}