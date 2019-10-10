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
using BattleTanks.Core.Notifications;
using MediatR;

namespace BattleTanks.Core.Service
{
    public class UserService : IUserService
    {
        private readonly IUoW _unitOfWork;
        private readonly IMapper _mapper;     
        private readonly IMediator _mediator;
        private readonly ICacheHelper _cacheHelper;

        public UserService(
            IUoW uow,
            IMapper mapper,
            IMediator mediator, 
            ICacheHelper cacheHelper)
        {
            _unitOfWork = uow;
            _mapper = mapper;
            _mediator = mediator;
            _cacheHelper = cacheHelper;
        }

        public UserDto GetByEmail(string email)
        {
            var user = _mapper.Map<UserDto>(_unitOfWork.UserRepo.Get("Role,Photo")
                .FirstOrDefault(o => o.Email == email));
            return user;
        }

        public UserDto GetById(Guid id)
        {
            var user = _mapper.Map<UserDto>(_unitOfWork.UserRepo.Get("Photo,Role")
                .FirstOrDefault(x => x.Id == id));
            return user;
        }
         
        public async Task<OperationResult> Create(UserDto userDto)
        {     
            if (_unitOfWork.UserRepo.Get().Any(u => u.Email == userDto.Email))
            {
                return new OperationResult(false, "Email already exists in database", "Email");
            }
            if (_unitOfWork.UserRepo.Get().Any(u => u.Nickname == userDto.Nickname))
            {
                return new OperationResult(false, "Nickname already exists", "Nickname");
            }
            var user = _mapper.Map<User>(userDto);

            user.Role = _unitOfWork.RoleRepo.Get().FirstOrDefault(r => r.Name == "User");


            var result = _unitOfWork.UserRepo.Insert(user);
            if (result.Email != user.Email || result.Id == Guid.Empty)
            {
                return new OperationResult(false, "Registration failed", "");
            }

            await _unitOfWork.SaveAsync();
            userDto.Id = result.Id;
            if (!userDto.EmailConfirmed)
            {
                await _mediator.Publish(new RegisterVerificationMessage(userDto));
            }

            return new OperationResult(true, "Registration success", "");
        }

        public async Task<OperationResult> ConfirmEmail(CacheDto cacheDto)
        {
            var user = _unitOfWork.UserRepo.Get(cacheDto.UserId);
            if (user == null)
            {
                return new OperationResult(false, "Invalid user Id", "userId");
            }

            if (string.IsNullOrEmpty(cacheDto.Token))
            {
                return new OperationResult(false, "Token is null or empty", "verification token");
            }
                                 
            if (cacheDto.Token != _cacheHelper.GetValue(cacheDto.UserId).Token)
            {
                return new OperationResult(false, "Validation failed", "");
            }

            user.EmailConfirmed = true;
            await _unitOfWork.SaveAsync();
            _cacheHelper.Delete(cacheDto.UserId);
            return new OperationResult(true, "Verify succeeded", "");
        }

    }
}
