using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.Core.DTOs
{
    public class GameLoadDto
    {
        public Guid TankId { get; set; }
        public Guid MapId { get; set; }
        public Guid UserId { get; set; }
        public bool Online { get; set; }
    }
}
