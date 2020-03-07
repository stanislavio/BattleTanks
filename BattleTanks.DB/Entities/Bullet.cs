using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.DB.Entities
{
    public class Bullet : BaseEntity
    {
        public float Speed { get; set; }
        public float Radius { get; set; }
    }
}
