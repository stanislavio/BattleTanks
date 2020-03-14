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

                                          
        public async Task<OperationResult> CreateOrUpdate(TankLoadDto model)
        {

            if (model.Id != null)
            {
                var tank = _unitOfWork.TankRepo.Get("Icon,Bullet.Photo").FirstOrDefault(x => x.Id == model.Id);

                if(tank == null)
                    return new OperationResult(false, "Tank with id not found", "");

                tank.Icon = model.TankPhoto != null ? await _photoService.AddPhoto(model.TankPhoto) : tank.Icon;
                tank.Speed = model.TankSpeed != 0 ? model.TankSpeed : tank.Speed;
                if (tank.Bullet == null)
                {
                    tank.Bullet = _unitOfWork.BulletRepo.Insert(
                        new Bullet
                        {
                            Photo = await _photoService.AddPhoto(model.BulletPhoto),
                            Speed = model.BulletSpeed
                        });
                }
                else
                {
                    tank.Bullet.Photo = model.BulletPhoto != null
                        ? await _photoService.AddPhoto(model.BulletPhoto)
                        : tank.Bullet.Photo;
                    tank.Bullet.Speed = model.BulletSpeed != 0 ? model.BulletSpeed : tank.Bullet.Speed;
                }

                await _unitOfWork.SaveAsync();

                return new OperationResult(true, "", "");
            }

            var tankPhoto = await _photoService.AddPhoto(model.TankPhoto);

            var bulletPhoto = await _photoService.AddPhoto(model.BulletPhoto);

            var bullet = _unitOfWork.BulletRepo.Insert(
                new Bullet
                {     
                    Photo = bulletPhoto,
                    Speed = model.BulletSpeed
                });

             _unitOfWork.TankRepo.Insert(
                new Tank()
                {
                    Name = model.Name,
                    Icon = tankPhoto,
                    Bullet = bullet,
                    Speed = model.TankSpeed
                });

            await _unitOfWork.SaveAsync();

            return new OperationResult(true, "", "");
        }

        public TankDto Get(Guid id)
        {
            var tank = _unitOfWork.TankRepo.Get("Icon,Bullet.Photo").FirstOrDefault(x => x.Id == id);
            return _mapper.Map<TankDto>(tank);
        }

        public IEnumerable<TankDto> All()
        {
            return _mapper.Map<IEnumerable<TankDto>>(_unitOfWork.TankRepo.Get(includeProperties: "Icon,Bullet.Photo").AsEnumerable());
        }

    }
}
