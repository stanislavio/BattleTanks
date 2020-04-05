using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.Core.DTOs
{
    public class KillDto
    {
        public Guid GameId { get; set; }
        public Guid PlayerId { get; set; }
    }
}
