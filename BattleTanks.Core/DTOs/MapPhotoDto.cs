using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace BattleTanks.Core.DTOs
{
    public class MapPhotoDto
    {
        public string Title { get; set; }
        public Guid MapId { get; set; }
        public IFormFile Photo { get; set; }
    }
}
