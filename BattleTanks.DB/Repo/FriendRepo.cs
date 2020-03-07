using System;
using System.Collections.Generic;
using System.Text;
using BattleTanks.DB.EF;
using BattleTanks.DB.Entities;
using BattleTanks.DB.IRepo;

namespace BattleTanks.DB.Repo
{
    public class FriendRepo : Repo<Friend>, IFriendRepo
    {
        public FriendRepo(AppDbContext context) : base(context)
        {
        }
    }
}
