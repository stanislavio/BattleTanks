using BattleTanks.DB.EF;
using BattleTanks.DB.IRepo;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BattleTanks.DB.Repo
{
    public class UnitOfWork : IUoW
    {
        private readonly AppDbContext _db;

        private IUserRepo _userRepo;
        private IPhotoRepo _photoRepo;
        private IRoleRepo _roleRepo;
        private IMapRepo _mapRepo;
        private ITankRepo _tankRepo;
        private IBulletRepo _bulletRepo;
        private IGameRepo _gameRepo;
        private IUserGame _userGame;
        private IUserActivity _userActivity;
        private IFriendRepo _friendRepo;
        private IUserTankAccess _userTankAccess;

        public UnitOfWork(
            AppDbContext context
            )
        {
            _db = context;
        }

        public IUserRepo UserRepo =>
            _userRepo ?? (_userRepo = new UserRepo(_db));
                                               
        public IPhotoRepo PhotoRepo =>                                         
            _photoRepo ?? (_photoRepo = new PhotoRepo(_db));

        public IRoleRepo RoleRepo => 
            _roleRepo ?? (_roleRepo = new RoleRepo(_db));

        public IMapRepo MapRepo =>
            _mapRepo ?? (_mapRepo = new MapRepo(_db));

        public ITankRepo TankRepo =>
            _tankRepo ?? (_tankRepo = new TankRepo(_db));

        public IBulletRepo BulletRepo =>
            _bulletRepo ?? (_bulletRepo = new BulletRepo(_db));

        public IGameRepo GameRepo =>
            _gameRepo ?? (_gameRepo = new GameRepo(_db));

        public IUserGame UserGame =>
            _userGame ?? (_userGame = new UserGameRepo(_db));

        public IUserActivity UserActivity =>
            _userActivity ?? (_userActivity = new UserActivityRepo(_db));

        public IFriendRepo FriendRepo =>
            _friendRepo ?? (_friendRepo = new FriendRepo(_db));

        public IUserTankAccess UserTankAccess =>
            _userTankAccess ?? (_userTankAccess = new UserTankAccessRepo(_db));

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                }
                this.disposed = true;
            }
        }

        public async Task SaveAsync()
        {
            await _db.SaveChangesAsync();
        }
    }
}
