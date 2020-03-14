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
        ITankRepo TankRepo { get; }
        IBulletRepo BulletRepo { get; }
        IGameRepo GameRepo { get; }
        IUserGame UserGame { get; }
        IUserActivity UserActivity { get; }
        IFriendRepo FriendRepo { get; }
        IUserTankAccess UserTankAccess { get; }
        IMapIcon MapIconRepo { get; }
        

        Task SaveAsync();
    }
}
