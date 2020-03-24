using AutoMapper;
using BattleTanks.Core.DTOs;
using BattleTanks.Core.Infrastructure;
using BattleTanks.Core.IService;
using BattleTanks.DB.Helpers;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;                                     
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using BattleTanks.DB.Entities;
using BattleTanks.DB.IRepo;

namespace BattleTanks.Core.Service
{
    public class AuthService : IAuthService
    {
        private readonly IMapper _mapper;           
        private readonly IUserService _userService;
        private readonly IJwtSigningEncodingKey _signingEncodingKey;
        private readonly IConfiguration _configuration;
        private readonly IUoW _unitOfWork;

        public AuthService(
            IMapper mapper,
            IUserService userService,
            IJwtSigningEncodingKey signingEncodingKey,
            IConfiguration configuration,
            IUoW unitOfWork
        )
        {
            _mapper = mapper;
            _userService = userService;
            _signingEncodingKey = signingEncodingKey;
            _configuration = configuration;
            _unitOfWork = unitOfWork;
        }

        public async Task<OperationResult> ChangePasswordAsync(UserDto userDto, string oldPassword, string newPassword)
        {
            if (!VerifyPassword(userDto, oldPassword)) return new OperationResult(false, "Invalid password", "");
            userDto.PasswordHash = PasswordHasher.GenerateHash(newPassword);

            return await _userService.Update(userDto);
        }

        public async Task<OperationResult> Authenticate(string email, string password)
        {
            var user = _userService.GetByEmailOrNickname(email);
            if (user == null)
            {
                return new OperationResult(false, "Invalid Login or Password", "email");
            }

            if (user.IsBlocked)
            {
                return new OperationResult(false, $"{email}, your account was blocked.", "email");
            }

            if (!user.EmailConfirmed)
            {
                return new OperationResult(false, $"{email} is not confirmed, please confirm", "");
            }

            if (!VerifyPassword(user, password))
            {
                return new OperationResult(false, "Invalid Login or Password", "Password");
            }

            var token = GenerateJwt(user);

            var res = _unitOfWork.UserActivity.Insert(new UserActivity() {UserId = user.Id});

            await _unitOfWork.SaveAsync();
             
            return new OperationResult(true, token, "");
        }

        public UserDto GetCurrentUser(ClaimsPrincipal userClaims)
        {
            string email = userClaims.FindFirst(ClaimTypes.Email).Value;
            if (string.IsNullOrEmpty(email))
            {
                return null;
            }
            return _userService.GetByEmailOrNickname(email);
        }

        private static bool VerifyPassword(UserDto user, string actualPassword) =>
           (user.PasswordHash == PasswordHasher.GenerateHash(actualPassword));
                                                        
        private string GenerateJwt(UserDto user)
        {
            var lifeTime = _configuration.GetValue<int>("JWTOptions:LifeTime");

            var claims = new[]
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role.Name),
                new Claim(ClaimTypes.Name, user.Id.ToString()),
            };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(lifeTime),
                signingCredentials: new SigningCredentials(
                        _signingEncodingKey.GetKey(),
                        _signingEncodingKey.SigningAlgorithm)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public OperationResult FirstAuthenticate(UserDto userDto)
        {
            if (userDto == null)
            {
                return new OperationResult(false, $"User with email: {userDto.Email} not found", "email");
            }
            var token = GenerateJwt(userDto);

            return new OperationResult(true, token, "");
        }
    }
}
