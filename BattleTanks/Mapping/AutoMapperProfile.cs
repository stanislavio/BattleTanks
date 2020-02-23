using AutoMapper;
using BattleTanks.Core.DTOs;
using BattleTanks.DB.Entities;
using System;
using BattleTanks.Core.DTO;
using BattleTanks.Core.Extensions;
using BattleTanks.DB.Helpers;

namespace BattleTanks.Mapping
{
    public class AutoMapperProfile : Profile
    {                             
        public AutoMapperProfile()
        {
            CreateMap<Map, MapDto>().ForMember(dest => dest.WallIcon,
                opts => opts.MapFrom(src => src.WallIcon.Img.ToRenderablePictureString()));

            CreateMap<Tank, TankDto>().ForMember(dest => dest.PhotoUrl,
                opts => opts.MapFrom(src => src.Icon.Img.ToRenderablePictureString()));


            CreateMap<User, UserDto>().ReverseMap();

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
