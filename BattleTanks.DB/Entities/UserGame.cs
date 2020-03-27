using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.DB.Entities
{
    public class UserGame : BaseEntity
    {
        public User Tanker { get; set; }
        public Guid? TankerId { get; set; }

        public Game Game { get; set; }
        public Guid? GameId { get; set; }

        public Tank Tank { get; set; }
        public Guid? TankId { get; set; }

        public string Coordinates { get; set; }
        public bool Died { get; set; }
    }
}
