using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.DB.Entities
{
    public class Game : BaseEntity
    {
        public Map Map { get; set; }
        public Guid? MapId { get; set; }

        public DateTime Started { get; set; } = DateTime.Now;
        public DateTime Finished { get; set; }

        public bool Online { get; set; }

        public string CurrentMapCoordinates { get; set; }

        public List<UserGame> Users { get; set; }

    }
}
