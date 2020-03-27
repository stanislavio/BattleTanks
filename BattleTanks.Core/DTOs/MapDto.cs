using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BattleTanks.DB.Entities;
using Microsoft.AspNetCore.Http;

namespace BattleTanks.Core.DTO
{
    public class MapDto
    {
        public Guid? Id { get; set; }

        public string Coordinates { get; set; }

        public string WallIcon { get; set; }

        public IFormFile Photo { get; set; }

        public IFormFile Preview { get; set; }
    }
}
