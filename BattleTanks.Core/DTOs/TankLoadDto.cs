using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace BattleTanks.Core.DTOs
{
    public class TankLoadDto
    {
        public Guid? Id { get; set; }
                     
        public string Name { get; set; }

        public IFormFile TankPhoto { get; set; }
                         
        public float TankSpeed { get; set; }
                     
        public IFormFile BulletPhoto { get; set; }
                    
        public float BulletSpeed { get; set; }
    }
}
