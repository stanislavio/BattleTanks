using BattleTanks.DB.EF;
using BattleTanks.DB.Entities;
using BattleTanks.DB.IRepo;
using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.DB.Repo
{
    public class RoleRepo : Repo<Role>, IRoleRepo
    {
        public RoleRepo(AppDbContext db) : base(db)
        {

        }
    }
}
