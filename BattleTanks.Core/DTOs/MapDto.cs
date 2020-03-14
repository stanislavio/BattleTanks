using System;
using System.Collections.Generic;

namespace BattleTanks.Core.DTOs
{
    public class MapDto
    {
        public Guid? Id { get; set; }

        public string Name { get; set; }

        public string Coordinates { get; set; }  

        public List<PhotoDto> Photos { get; set; }
    }
}
