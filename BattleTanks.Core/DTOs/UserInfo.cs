using BattleTanks.DB.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.Core.DTOs
{
    public class UserInfo
    {
        public Guid Id;
        public string Nickname { get; set; }
        public string Email { get; set; }  
        public Gender Gender { get; set; }
        public string Role { get; set; }
        public string PhotoUrl { get; set; }
        public string Token { get; set; }
        public bool AfterEmailConfirmation { get; set; } = false;      

    }
}
