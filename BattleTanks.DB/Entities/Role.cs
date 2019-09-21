using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.DB.Entities
{ 
    public class Role : BaseEntity
    {
        public string Name { get; set; }

        public IEnumerable<User> Users { get; set; }

        //navigation properties:
    }
}
