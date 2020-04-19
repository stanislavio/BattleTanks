﻿using AutoMapper;
using BattleTanks.Core.DTOs;
using BattleTanks.Core.Infrastructure;
using BattleTanks.Core.IService;
using BattleTanks.DB.Entities;
using BattleTanks.DB.IRepo;
using System;
using System.Collections.Generic;
using System.Linq;           
using System.Threading.Tasks;
using BattleTanks.Core.Notifications;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace BattleTanks.Core.Service
{
    public class UserService : IUserService
    {
        private readonly IUoW _unitOfWork;
        private readonly IMapper _mapper;     
        private readonly IMediator _mediator;
        private readonly ICacheHelper _cacheHelper;
        private readonly IPhotoService _photoService;

        public UserService(
            IUoW uow,
            IMapper mapper,
            IMediator mediator, 
            ICacheHelper cacheHelper, 
            IPhotoService photoService)
        {
            _unitOfWork = uow;
            _mapper = mapper;
            _mediator = mediator;
            _cacheHelper = cacheHelper;
            _photoService = photoService;
        }

        public async Task<OperationResult> Update(UserDto model)
        {
            if (string.IsNullOrEmpty(model.Email))
            {
                return new OperationResult(false, "EMAIL cannot be empty", "Email");
            }

            if (!_unitOfWork.UserRepo.Get().Any(u => u.Id == model.Id))
            {
                return new OperationResult(false, "Not found", "");
            }

            var result = _mapper.Map<UserDto, User>(model);
            try
            {
                _unitOfWork.UserRepo.Update(result);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception e)
            {
                return new OperationResult(false, $"{e.Message}", "");
            }
            return new OperationResult(true);
        }


        public UserDto GetByEmailOrNickname(string email)
        {
            var user = _mapper.Map<UserDto>(_unitOfWork.UserRepo.Get("Photo,Role").AsNoTracking()
                .FirstOrDefault(o => ((o.Email == email) || (o.Nickname == email))));
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
                                 
            if (cacheDto.Token != _cacheHelper.GetValue(cacheDto.UserId)?.Token)
            {
                return new OperationResult(false, "Validation failed", "");
            }

            user.EmailConfirmed = true;
            await _unitOfWork.SaveAsync();
            _cacheHelper.Delete(cacheDto.UserId);
            return new OperationResult(true, "Verify succeeded", "");
        }

        public async Task<OperationResult> ChangeAvatar(Guid uId, IFormFile avatar)
        {
            var user = _unitOfWork.UserRepo.Get("Photo").FirstOrDefault(u => u.Id == uId);
            if (user == null)
            {
                return new OperationResult(false, "User not found", "Id");
            }

            if (user.Photo != null)
            {
                await _photoService.Delete(user.Photo.Id);
            }
            try
            {
                user.Photo = await _photoService.AddPhoto(avatar);
                _unitOfWork.UserRepo.Update(user);
                await _unitOfWork.SaveAsync();
                return new OperationResult(true);
            }
            catch
            {
                return new OperationResult(false, "Bad image file", "Id");
            }
        }

        public IEnumerable<UserInfo> GetUsers()
        {
            return _mapper.Map<IEnumerable<UserInfo>>(_unitOfWork.UserRepo.Get("Photo,Role"));
        }

        public async Task<OperationResult> Follow(FriendDto model)
        {

            var currentStatus = _unitOfWork.FriendRepo.Get()
                .FirstOrDefault(x => x.WhoId == model.Who && x.ForWhoId == model.For);
            if (currentStatus != null)
            {
                currentStatus.Deleted = !currentStatus.Deleted;
                _unitOfWork.FriendRepo.Update(currentStatus);
                await _unitOfWork.SaveAsync();
                return new OperationResult(true);
            }

            _unitOfWork.FriendRepo.Insert(new Friend()
            {
                WhoId = model.Who,
                ForWhoId = model.For
            });

            await _unitOfWork.SaveAsync();
            return new OperationResult(true);
        }

        public List<UserInfo> GetFriends(Guid userId)
        {
            var res = _unitOfWork.FriendRepo.Get("ForWho.Photo").Where(x => x.WhoId == userId).ToList();

            return _mapper.Map<List<UserInfo>>(res.Select(x => x.ForWho));
        }
    }
}
