using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BattleTanks.DB.Entities
{
    public class Map : BaseEntity
    {
        public string Name { get; set; } = "Unknown";
        public string Coordinates { get; set; }

        public List<MapIcon> Photos { get; set; }

    }
}
