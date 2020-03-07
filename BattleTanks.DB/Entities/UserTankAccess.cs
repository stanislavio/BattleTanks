using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.DB.Entities
{
    public class UserTankAccess : BaseEntity
    {
        public User User { get; set; }
        public Guid? UserId { get; set; }

        public Tank Tank { get; set; }
        public Guid? TankId { get; set; }
    }
}
