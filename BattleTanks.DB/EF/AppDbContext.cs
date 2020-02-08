using BattleTanks.DB.Entities;
using Microsoft.EntityFrameworkCore;        

namespace BattleTanks.DB.EF
{
    public class AppDbContext : DbContext
    {

        public DbSet<Role> Roles { get; set; }
        
        public DbSet<User> Users { get; set; }

        public DbSet<Tank> Tanks { get; set; }

        public DbSet<Map> Maps { get; set; }

        //public DbSet<Relationship> Relationships { get; set; }

        public DbSet<Photo> Photos { get; set; }


        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {                 
            Database.Migrate();
        }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


            // user config                                 
            //builder.Entity<User>()
            //    .Property(u => u.Birthday).HasColumnType("date");

                                        
            //builder.Entity<Relationship>()
            //    .HasOne(r => r.UserFrom)
            //    .WithMany(u => u.Relationships)
            //    .HasForeignKey(r => r.UserFromId).OnDelete(DeleteBehavior.Restrict);

            // user-category many-to-many
            //builder.Entity<UserCategory>()
            //    .HasKey(t => new { t.UserId, t.CategoryId });
            //builder.Entity<UserCategory>()
            //    .HasOne(uc => uc.User)
            //    .WithMany(u => u.Categories)
            //    .HasForeignKey(uc => uc.UserId);
            //builder.Entity<UserCategory>()
            //    .HasOne(uc => uc.Category)
            //    .WithMany(c => c.Users)
            //    .HasForeignKey(uc => uc.CategoryId);
                      
        }
    }
}
