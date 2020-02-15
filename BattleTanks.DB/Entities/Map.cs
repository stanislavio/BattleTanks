using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BattleTanks.DB.Entities
{
    public class Map : BaseEntity
    {                                                                 
        public string Coordinates { get; set; }

        public Photo WallIcon { get; set; }
    }
}
