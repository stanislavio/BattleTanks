using System;
using System.Collections.Generic;
using System.Text;
using BattleTanks.DB.Entities;
using Microsoft.AspNetCore.Http;

namespace BattleTanks.Core.DTOs
{
    public class TankDto
    {
        public Guid Id { get; set; }

        public IFormFile Photo { get; set; }

        public string PhotoUrl { get; set; }
    }
}
