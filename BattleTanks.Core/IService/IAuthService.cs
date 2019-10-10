using BattleTanks.Core.DTOs;
using BattleTanks.Core.Infrastructure;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace BattleTanks.Core.IService
{
    public interface IAuthService
    {
        OperationResult Authenticate(string email, string password);
        UserDto GetCurrentUser(ClaimsPrincipal userClaims);
        OperationResult FirstAuthenticate(UserDto userDto);
    }
}
