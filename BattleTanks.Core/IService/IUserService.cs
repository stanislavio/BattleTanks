using BattleTanks.Core.DTOs;
using BattleTanks.Core.Infrastructure;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BattleTanks.Core.IService
{
    public interface IUserService
    {
        UserDTO GetByEmail(string email);     
        Task<OperationResult> Create(UserDTO userDto);
    }
}
