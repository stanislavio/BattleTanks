using BattleTanks.DB.Entities;
using BattleTanks.DB.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.Core.DTOs
{
    public class UserDto
    {
        public Guid Id;
        public string Nickname { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }
        public int Age { get; set; }
        public int Money { get; set; }
        public bool EmailConfirmed { get; set; }      
        public Gender Gender { get; set; }
        public bool IsBlocked { get; set; }
        public virtual Guid RoleId { get; set; }
        public virtual Role Role { get; set; }
        public virtual Guid? PhotoId { get; set; }
        public virtual Photo Photo { get; set; }

    }
}
