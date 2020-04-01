using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.Core.DTOs
{
    public class GamePreviewDto
    {
        public Guid Id { get; set; }
        public UserInfo Author { get; set; }
        public List<PlayerInfoDto> Players { get; set; }
        // public MapDto Map { get; set; }
    }
}
