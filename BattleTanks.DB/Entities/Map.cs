using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BattleTanks.DB.Entities
{
    public class Map : BaseEntity
    {
        [MaxLength(1048, ErrorMessage = "Length must be less 1048")]
        public string Coordinates { get; set; }

        public Photo WallIcon { get; set; }
    }
}
