using BattleTanks.DB.EF;
using BattleTanks.DB.Entities;
using BattleTanks.DB.Enums;
using BattleTanks.DB.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BattleTanks.DB.DbInitialize
{
    public static class DbInitializer
    {          
        public static void Seed(AppDbContext dbContext)
        {
            dbContext.Database.EnsureCreated();

            //Look for any users
            if (dbContext.Users.Any())
            {
                return; // DB has been seeded
            }                                                            

            Role adminRole = new Role { Name = "Admin" };
            Role userRole = new Role { Name = "User" };
            dbContext.Roles.AddRange(new Role[] { adminRole, userRole });

            var users = new User[] {
                 new User{
                     Nickname ="Admin",
                     PasswordHash = PasswordHasher.GenerateHash("1qaz1qaz"),
                     Email ="admin@gmail.com",
                     EmailConfirmed = true,              
                     Gender = Gender.Male,
                     IsBlocked = false,
                     Age = 17,
                     Money = 1000,
                     Role =adminRole
                 },

                  new User{
                      Nickname ="UserTest",
                      PasswordHash = PasswordHasher.GenerateHash("1qaz1qaz"),
                      Email ="user@gmail.com",
                      EmailConfirmed = true,
                      Gender = Gender.Male,
                      IsBlocked =false,
                      Age = 16,
                      Money = 1000,
                      Role = userRole
                  }
            };

            dbContext.Users.AddRange(users);

            dbContext.SaveChanges();
        }
    }
}
