using BattleTanks.Core.IService;
using BattleTanks.DB.IRepo;
using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.Core.Service
{
    public class PhotoService : IPhotoService
    {
        private readonly IUoW UnitOfWork;

        public PhotoService(IUoW uow)
        {
            UnitOfWork = uow;
        }
    }
}
