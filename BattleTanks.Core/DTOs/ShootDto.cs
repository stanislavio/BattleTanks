using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.Core.DTOs
{
    public class ShootDto
    {
        public Guid OwnerId { get; set; }
        public string Direct { get; set; }
        public string Position { get; set; }
        public string Players { get; set; }
    }
}
