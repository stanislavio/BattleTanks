using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BattleTanks.DB.IRepo
{
    public interface IUoW : IDisposable
    {
        IUserRepo UserRepo { get; }
        IPhotoRepo PhotoRepo { get; }
        IRoleRepo RoleRepo { get; }
        IMapRepo MapRepo { get; }

        Task SaveAsync();
    }
}
