using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.Core.DTOs
{
    public class SaveGameInfo
    {
        public Guid Id { get; set; }
        public string CurrentMap { get; set; }
    }
}
