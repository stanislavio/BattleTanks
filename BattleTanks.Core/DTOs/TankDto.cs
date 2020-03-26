using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using BattleTanks.DB.Entities;
using Microsoft.AspNetCore.Http;

namespace BattleTanks.Core.DTOs
{
    public class TankDto
    {
        public Guid? Id { get; set; }

        public string Name { get; set; }

        public string TankPhotoUrl { get; set; }

        public float TankSpeed { get; set; }

        public string BulletPhotoUrl { get; set; }

        public float BulletSpeed { get; set; }

        public int RechargeTime { get; set; }


    }
}
