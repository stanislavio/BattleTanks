using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.DB.Entities
{
    public class Bullet : BaseEntity
    {
        public Photo Photo { get; set; }
        public Guid? PhotoId { get; set; }

        public float Speed { get; set; }       
    }
}
