using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.DB.Entities
{
    public class Tank : BaseEntity
    {
        public Photo Icon { get; set; }
        public Guid? IconId { get; set; }
    }
}
