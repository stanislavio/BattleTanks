using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BattleTanks.Core.DTOs;
using BattleTanks.Core.IService;
using BattleTanks.DB.IRepo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BattleTanks.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class MapController : ControllerBase
    {                                       
        private readonly IMapService _mapService;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="mapService"></param>
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

        /// <summary>
        /// Get map with icons 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public IActionResult Get([FromQuery]Guid id)
        {
            return Ok(_mapService.Get(id));
        }

        /// <summary>
        /// Create or Update Map for Game. 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        [Authorize(Roles="Admin")]
        public async Task<IActionResult> CreateOrUpdate([FromForm]MapDto model)
        {
            var result = await _mapService.CreateOrUpdate(model);
            if (result.Successed)
                return Ok(result.Property);
            return BadRequest("values not valid");
        }

        /// <summary>
        /// Delete Icon of Map
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeletePhoto(Guid id)
        {
            var result = await _mapService.DeletePhoto(id);
            if (result.Successed)
                return Ok(result.Message);
            return BadRequest(result.Message);
        }

        /// <summary>
        /// Add icons for map
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddPhoto([FromForm] MapPhotoDto model)
        {                                                                      
            var res = await _mapService.AddPhoto(model);

            if(res.Successed)
                return Ok(res.Message);

            return BadRequest(res.Message);
        }
    }
}