using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.DB.Entities
{
    public class Friend : BaseEntity
    {
        public User Who { get; set; }

        public User ForWho { get; set; }

        public bool Deleted { get; set; }
    }
}
