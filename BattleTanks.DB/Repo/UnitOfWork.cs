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
        private AppDbContext DB;

        private IUserRepo userRepo;
        private IPhotoRepo photoRepo;
        private IRoleRepo roleRepo;
        private IMapRepo mapRepo;
        private ITankRepo tankRepo;

        public UnitOfWork(
            AppDbContext context
            )
        {
            DB = context;
        }

        public IUserRepo UserRepo =>
            userRepo ?? (userRepo = new UserRepo(DB));
                                               
        public IPhotoRepo PhotoRepo => 
            photoRepo ?? (photoRepo = new PhotoRepo(DB));

        public IRoleRepo RoleRepo => 
            roleRepo ?? (roleRepo = new RoleRepo(DB));

        public IMapRepo MapRepo =>
            mapRepo ?? (mapRepo = new MapRepo(DB));

        public ITankRepo TankRepo =>
            tankRepo ?? (tankRepo = new TankRepo(DB));

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
            await DB.SaveChangesAsync();
        }
    }
}
