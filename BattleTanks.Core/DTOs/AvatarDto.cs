using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace BattleTanks.Core.DTOs
{
    public class AvatarDto
    {
        public IFormFile Photo { get; set; }
    }
}
