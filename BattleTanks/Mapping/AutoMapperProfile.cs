using AutoMapper;
using BattleTanks.Core.DTOs;
using BattleTanks.DB.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BattleTanks.Mapping
{
    public class AutoMapperProfile : Profile
    {                             
        public AutoMapperProfile()
        {
            CreateMap<User, UserDTO>();

            CreateMap<UserDTO, UserInfo>()
                .ForMember(dest => dest.Nickname, opts => opts.MapFrom(src => src.Nickname ?? src.Email.Substring(0, src.Email.IndexOf("@", StringComparison.Ordinal))))
                .ForMember(dest => dest.Role, opts => opts.MapFrom(src => src.Role.Name))
                //.ForMember(dest => dest.PhotoUrl,
                //    opts => opts.MapFrom(src => src.Photo.Thumb.ToRenderablePictureString()))
                .ForMember(dest => dest.Gender, opts => opts.MapFrom(src => src.Gender));
        }
    }
}
