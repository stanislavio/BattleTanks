using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.DB.Entities
{
    public class Tank : BaseEntity
    {
        public Photo Icon { get; set; }
        public Guid? IconId { get; set; }

        public Bullet Bullet { get; set; }
        public Guid? BulletId { get; set; }

        public float Speed { get; set; }
        public int Weight { get; set; }

    }
}
