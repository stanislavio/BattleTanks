using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BattleTanks.Core.DTOs;
using BattleTanks.Core.Infrastructure;
using BattleTanks.Core.IService;
using BattleTanks.DB.Entities;
using BattleTanks.DB.IRepo;

namespace BattleTanks.Core.Service
{
    public class TankService : ITankService
    {

        private readonly IUoW _unitOfWork;
        private readonly IPhotoService _photoService;
        private readonly IMapper _mapper;

        public TankService(
            IUoW unitOfWork,
            IPhotoService photoService,
            IMapper mapper
        )
        {
            _unitOfWork = unitOfWork;
            _photoService = photoService;
            _mapper = mapper;
        }

                                          
        public async Task<OperationResult> CreateOrUpdate(TankDto model)
        {

            if (model.Id != null)
            {

            }

            Photo icon = await _photoService.AddPhoto(model.Photo);

            var tank = _unitOfWork.TankRepo.Insert(new Tank(){ Icon = icon });

            await _unitOfWork.SaveAsync();

            return new OperationResult(true, "", "");
        }

        public TankDto Get(Guid id)
        {
            return _mapper.Map<TankDto>(_unitOfWork.TankRepo.Get("Photo").
                                                FirstOrDefault(x => x.Id == id));
        }

    }
}
