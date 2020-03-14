using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.Core.DTOs
{
    public class PhotoDto
    {
        public Guid? Id { get; set; }
        public string Title { get; set; }
        public string PhotoUrl { get; set; }
    }
}
