using AutoMapper;
using BattleTanks.Core.DTOs;
using BattleTanks.Core.IService;
using BattleTanks.DB.IRepo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

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

        public UserDTO GetByEmail(string email)
        {
            var user = _mapper.Map<UserDTO>(UnitOfWork.UserRepo.Get("Role,Photo").FirstOrDefault(o => o.Email == email));
            return user;
        }
    }
}
