using System;
using System.Collections.Generic;
using System.Text;
using BattleTanks.DB.Entities;

namespace BattleTanks.DB.Entities
{
    public class MapIcon : BaseEntity
    {
        public string Title { get; set; }

        public Map Map { get; set; }
        public Guid MapId { get; set; }

        public Photo Icon { get; set; }
        public Guid IconId { get; set; }

    }
}
