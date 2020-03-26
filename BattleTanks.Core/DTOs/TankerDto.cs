using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.Core.DTOs
{
    public class TankerDto
    {
        public Guid Id { get; set; }
        public UserInfo UserInfo { get; set; }

        public TankDto Tank { get; set; }
        public Guid TankId { get; set; }

        public DateTime LastShoot { get; set; }

        public string Coordinates { get; set; }
    }
}
