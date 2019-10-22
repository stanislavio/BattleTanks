using BattleTanks.Core.DTOs;
using BattleTanks.Core.Infrastructure;
using System;                        
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace BattleTanks.Core.IService
{
    public interface IUserService
    {
        UserDto GetByEmailOrNickname(string email);     
        Task<OperationResult> Create(UserDto userDto);
        Task<OperationResult> ConfirmEmail(CacheDto cacheDto);
        UserDto GetById(Guid id);                           
        Task<OperationResult> ChangeAvatar(Guid uId, IFormFile avatar);
    }
}
