using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.Core.DTOs
{
    public class GameDto
    {
        public Guid Id { get; set; }

        public MapDto Map { get; set; }
                                         
        public DateTime Started { get; set; }
        public DateTime Finished { get; set; }
        public Guid? WinnerId { get; set; }
    }
}
