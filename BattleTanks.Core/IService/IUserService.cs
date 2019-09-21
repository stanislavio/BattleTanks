using BattleTanks.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.Core.IService
{
    public interface IUserService
    {
        UserDTO GetByEmail(string email);
    }
}
