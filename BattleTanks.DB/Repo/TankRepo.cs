using System;
using System.Collections.Generic;
using System.Text;
using BattleTanks.DB.EF;
using BattleTanks.DB.Entities;
using BattleTanks.DB.IRepo;

namespace BattleTanks.DB.Repo
{
    public class TankRepo : Repo<Tank>, ITankRepo
    {
        public TankRepo(AppDbContext db) : base(db)
        {

        }            
    }
}
