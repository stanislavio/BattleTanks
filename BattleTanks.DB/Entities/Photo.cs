using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.DB.Entities
{
    public class Photo : BaseEntity
    {
        public byte[] Thumb { get; set; }
        public byte[] Img { get; set; }
    }
}
