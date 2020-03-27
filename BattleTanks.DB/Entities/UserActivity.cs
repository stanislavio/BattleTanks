using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.DB.Entities
{
    public class UserActivity : BaseEntity
    {
        public User User { get; set; }
        public Guid? UserId { get; set; }

        public DateTime Login { get; set; } = DateTime.Now;
        public DateTime Logout { get; set; }
    }
}
