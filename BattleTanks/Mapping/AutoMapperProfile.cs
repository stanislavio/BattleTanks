using AutoMapper;
using BattleTanks.Core.DTOs;
using BattleTanks.DB.Entities;
using System;
using System.Linq;
using BattleTanks.Core.Extensions;
using BattleTanks.Core.IService;
using BattleTanks.DB.Helpers;
using Microsoft.AspNetCore.Hosting.Internal;

namespace BattleTanks.Mapping
{
    /// <summary>
    /// 
    /// </summary>
    public class AutoMapperProfile : Profile
    {                             
        /// <summary>
        /// 
        /// </summary>
        public AutoMapperProfile()
        {               

            CreateMap<Map, MapDto>()
                .ForMember(dest => dest.Name, 
                    opts => opts.MapFrom(src => src.Name))
                .ForMember(dest => dest.Coordinates,
                    opts => opts.MapFrom(src => src.Coordinates))
                .ForMember(dest => dest.Photos,
                    opts => opts.MapFrom(src => src.Photos.Select(x => new PhotoDto()
                    {            
                        Id = x.Id, //Id MapIcon entity 
                        Title = x.Title,
                        PhotoUrl =  x.Icon.Thumb.ToRenderablePictureString()
                    })))
                ;

            CreateMap<UserGame, TankerDto>()
                .ForMember(dest => dest.TankId,
                    opts => opts.MapFrom(src => src.TankId))
                .ForMember(dest => dest.UserInfo,
                    opts => opts.MapFrom(src => new UserInfo()
                    {
                        Id = src.Tanker.Id,
                        PhotoUrl = src.Tanker.PhotoId != null ? src.Tanker.Photo.Img.ToRenderablePictureString() : null,
                        Email = src.Tanker.Email,
                        Nickname = src.Tanker.Nickname,   
                        Gender = src.Tanker.Gender,
                        Role = "",
                        AfterEmailConfirmation = true,
                        Token = ""
                    }))
                .ForMember(dest => dest.Coordinates,
                    opts => opts.MapFrom(src => src.Coordinates))
                .ForMember(dest => dest.Tank,
                    opts => opts.MapFrom(src => src.Tank))
                ;

            CreateMap<UserGame, GamePreviewDto>()
                .ForMember(dest => dest.Author,
                    opts => opts.MapFrom(src => new UserInfo()
                        {
                            Id = src.Tanker.Id,
                            PhotoUrl = src.Tanker.PhotoId != null ? src.Tanker.Photo.Img.ToRenderablePictureString() : null,
                            Role = "",
                            Gender = src.Tanker.Gender,
                            Email = src.Tanker.Email,
                            Nickname = src.Tanker.Nickname,
                            AfterEmailConfirmation = src.Tanker.EmailConfirmed,
                            Token = ""            
                        })
                    )
                .ForMember(dest => dest.Id,
                    opts => opts.MapFrom(src => src.GameId))
                .ForMember(dest => dest.Players,
                    opts => opts.MapFrom(src => src.Game.Users.Select(x => new PlayerInfoDto()
                    {
                        Id = x.TankerId.Value,
                        Position = x.Coordinates
                    })))
                .ForMember(dest => dest.Bet,
                    opts => opts.MapFrom(src => src.Game.Bet))
                ;


            CreateMap<Game, GameDto>()
                .ForMember(dest => dest.Map,
                    opts => opts.MapFrom(src => new MapDto()
                    {
                        Id = src.MapId,
                        Name = src.Map.Name,
                        Coordinates = string.IsNullOrEmpty(src.CurrentMapCoordinates)
                            ? src.Map.Coordinates
                            : src.CurrentMapCoordinates,
                        Photos = src.Map.Photos.Select(x => new PhotoDto()
                        {
                            Id = x.Id,
                            PhotoUrl = x.Icon.Thumb.ToRenderablePictureString(),
                            Title = x.Title
                        }).ToList()
                    }))
                .ForMember(dest => dest.Finished,
                    opts => opts.MapFrom(src => src.Finished))
                .ForMember(dest => dest.Started,
                    opts => opts.MapFrom(src => src.Started))
                .ForMember(dest => dest.WinnerId,
                    opts => opts.MapFrom(src =>
                        src.Finished != DateTime.MinValue ? 
                        src.Users.FirstOrDefault(x => x.DiedCount != 5).TankerId     
                        : null
                ));


            //TODO
            CreateMap<Tank, TankDto>()
                .ForMember(dest => dest.TankPhotoUrl,
                opts => opts.MapFrom(src => src.Icon.Img.ToRenderablePictureString()))
                .ForMember(dest => dest.BulletPhotoUrl,
                    opts => opts.MapFrom(src => src.Bullet.Photo.Img.ToRenderablePictureString()))
                .ForMember(dest => dest.TankSpeed,
                    opts => opts.MapFrom(src => src.Speed))
                .ForMember(dest => dest.Name,
                    opts => opts.MapFrom(src => src.Name))
                .ForMember(dest => dest.BulletSpeed,
                    opts => opts.MapFrom(src => src.Bullet.Speed));


            CreateMap<User, UserDto>().ReverseMap();

            CreateMap<User, UserInfo>()
                .ForMember(dest => dest.Nickname, opts => opts.MapFrom(src => src.Nickname ?? src.Email.Substring(0, src.Email.IndexOf("@", StringComparison.Ordinal))))
                .ForMember(dest => dest.Role, opts => opts.MapFrom(src => src.Role.Name))
                .ForMember(dest => dest.PhotoUrl,
                    opts => opts.MapFrom(src => src.Photo.Img.ToRenderablePictureString()))
                .ForMember(dest => dest.Gender, opts => opts.MapFrom(src => src.Gender))
            .ForMember(dest => dest.Age, opts => opts.MapFrom(src => src.Age))
            .ForMember(dest => dest.Money, opts => opts.MapFrom(src => src.Money));


            CreateMap<UserDto, UserInfo>()
                .ForMember(dest => dest.Nickname, opts => opts.MapFrom(src => src.Nickname ?? src.Email.Substring(0, src.Email.IndexOf("@", StringComparison.Ordinal))))
                .ForMember(dest => dest.Role, opts => opts.MapFrom(src => src.Role.Name))
                .ForMember(dest => dest.PhotoUrl,
                    opts => opts.MapFrom(src => src.Photo.Img.ToRenderablePictureString()))
                .ForMember(dest => dest.Gender, opts => opts.MapFrom(src => src.Gender));

            CreateMap<LoginDto, UserDto>();

            CreateMap<RegisterDto, UserDto>()
                .ForMember(dest => dest.PasswordHash,
                    opts => opts.MapFrom(src => PasswordHasher.GenerateHash(src.Password)));
        }
    }
}
