using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.Core.DTOs
{
    public class FriendDto
    {
        public Guid Who { get; set; }
        public Guid For { get; set; }
    }
}
