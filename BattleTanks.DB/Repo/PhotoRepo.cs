using BattleTanks.DB.EF;
using BattleTanks.DB.Entities;
using BattleTanks.DB.IRepo;
using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.DB.Repo
{
    public class PhotoRepo : Repo<Photo>, IPhotoRepo
    {
        public PhotoRepo(AppDbContext db) : base(db)
        {

        }
    }
}
