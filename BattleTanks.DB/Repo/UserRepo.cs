using BattleTanks.DB.EF;
using BattleTanks.DB.Entities;
using BattleTanks.DB.IRepo;
using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.DB.Repo
{
    public class UserRepo : Repo<User>, IUserRepo
    {
        public UserRepo(AppDbContext db) : base(db)
        {

        }
    }
}
