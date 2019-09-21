using BattleTanks.Core.IService;
using BattleTanks.DB.IRepo;
using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.Core.Service
{
    public class RoleService : IRoleService
    {
        private readonly IUoW UnitOfWork;

        public RoleService(IUoW uow)
        {
            UnitOfWork = uow;
        }
    }
}
