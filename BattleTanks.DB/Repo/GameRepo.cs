using System;
using System.Collections.Generic;
using System.Text;
using BattleTanks.DB.EF;
using BattleTanks.DB.Entities;
using BattleTanks.DB.IRepo;

namespace BattleTanks.DB.Repo
{
    public class GameRepo : Repo<Game>, IGameRepo
    {
        public GameRepo(AppDbContext context) : base(context)
        {
        }
    }
}
