using BattleTanks.Core.Infrastructure;
using System;
using System.Collections.Generic;
using System.Text;

namespace BattleTanks.Core.IService
{
    public interface IAuthService
    {
        OperationResult Authenticate(string email, string password);                                       
        //UserDTO GetCurrentUser(ClaimsPrincipal userClaims);
    }
}
