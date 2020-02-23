using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BattleTanks.Core.DTO;
using BattleTanks.Core.Infrastructure;
using BattleTanks.Core.IService;
using BattleTanks.DB.Entities;
using BattleTanks.DB.IRepo;
using Microsoft.EntityFrameworkCore;

namespace BattleTanks.Core.Service
{
    public class MapService : IMapService
    {
        private readonly IUoW _unitOfWork;
        private readonly IPhotoService _photoService;
        private readonly IMapper _mapper;

        public MapService(
                IUoW unitOfWork,
                IPhotoService photoService,
                IMapper mapper
        )
        {
            _unitOfWork = unitOfWork;
            _photoService = photoService;
            _mapper = mapper;
        }
        

        public async Task<OperationResult> CreateOrUpdate(MapDto model)
        {
            if (model.Id != null)
            {

            }

            Photo icon = await _photoService.AddPhoto(model.Photo);
            if (model.Preview != null)
            {
                Photo previewIcon = await _photoService.AddPhoto(model.Preview);
            }

            var map = _unitOfWork.MapRepo.Insert(new Map() {Coordinates = model.Coordinates, WallIcon = icon});
            await _unitOfWork.SaveAsync();
            return new OperationResult(true, "Ok", map.Id + " " + map.Coordinates);
        }

        public IEnumerable<MapDto> AllMap()
        {
            return _mapper.Map<IEnumerable<MapDto>>(_unitOfWork.MapRepo.Get(includeProperties: "WallIcon").AsEnumerable());
        }

        public MapDto Get(Guid id)
        {
            return _mapper.Map<MapDto>(_unitOfWork.MapRepo.Get(includeProperties: "WallIcon").FirstOrDefault(x => x.Id == id));
        }

    }
}
