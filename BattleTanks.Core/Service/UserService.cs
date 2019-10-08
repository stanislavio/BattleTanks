using AutoMapper;
using BattleTanks.Core.DTOs;
using BattleTanks.Core.Infrastructure;
using BattleTanks.Core.IService;
using BattleTanks.DB.Entities;
using BattleTanks.DB.IRepo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BattleTanks.Core.Service
{
    public class UserService : IUserService
    {
        private readonly IUoW UnitOfWork;
        private readonly IMapper _mapper; 

        public UserService(
            IUoW uow,
            IMapper mapper)
        {
            UnitOfWork = uow;
            _mapper = mapper;
        }

        public UserDto GetByEmail(string email)
        {
            var user = _mapper.Map<UserDto>(UnitOfWork.UserRepo.Get("Role,Photo").FirstOrDefault(o => o.Email == email));
            return user;
        }

        public async Task<OperationResult> Create(UserDto userDto)
        {


            if (UnitOfWork.UserRepo.Get().Any(u => u.Email == userDto.Email))
            {
                return new OperationResult(false, "Email already exists in database", "Email");
            }
            if (UnitOfWork.UserRepo.Get().Any(u => u.Nickname == userDto.Nickname))
            {
                return new OperationResult(false, "Nickname already exists", "Nickname");
            }
            var user = _mapper.Map<User>(userDto);

            user.Role = UnitOfWork.RoleRepo.Get().FirstOrDefault(r => r.Name == "User");


            var result = UnitOfWork.UserRepo.Insert(user);
            if (result.Email != user.Email || result.Id == Guid.Empty)
            {
                return new OperationResult(false, "Registration failed", "");
            }

            await UnitOfWork.SaveAsync();
            userDto.Id = result.Id;
            //if (!userDto.EmailConfirmed)
            //{
            //    await _mediator.Publish(new RegisterVerificationMessage(userDto));
            //}

            return new OperationResult(true, "Registration success", "");
        }
    }
}
