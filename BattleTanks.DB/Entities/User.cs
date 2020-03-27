using BattleTanks.DB.Enums;
using System;        

namespace BattleTanks.DB.Entities
{
    public class User : BaseEntity
    {
        public string Nickname { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }
        public int Age { get; set; }
        public int Money { get; set; } = 1000;
        
        public bool EmailConfirmed { get; set; }   
        public Gender Gender { get; set; }
        public bool IsBlocked { get; set; }
        public Guid RoleId { get; set; }
        public virtual Role Role { get; set; }
        public Guid? PhotoId { get; set; }
        public virtual Photo Photo { get; set; }
    }
}
