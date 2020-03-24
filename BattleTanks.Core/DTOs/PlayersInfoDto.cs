using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.Core.DTOs
{
    public class PlayerInfoDto
    {
        public Guid Id { get; set; }
        public string Position { get; set; }
        public string MapCoordinates { get; set; }
    }
}
