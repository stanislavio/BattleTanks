using BattleTanks.DB.Entities;
using BattleTanks.DB.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.Core.DTOs
{
    public class UserDTO
    {
        public Guid Id;
        public string Nickname { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }      
        public Gender Gender { get; set; }
        public bool IsBlocked { get; set; }
        public virtual Guid RoleId { get; set; }
        public virtual Role Role { get; set; }
        public virtual Guid? PhotoId { get; set; }
        public virtual Photo Photo { get; set; }

    }
}
