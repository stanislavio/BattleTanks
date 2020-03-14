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

        public async Task<OperationResult> DeletePhoto(Guid id)
        {
            var map = _unitOfWork.MapIconRepo.Get(id);
            if(map == null) return new OperationResult(false, "Map not Found", "");
            var res = _unitOfWork.MapIconRepo.Delete(map);
            await _unitOfWork.SaveAsync();
            return new OperationResult(true, "Map was deleted", "");
        }

        public async Task<OperationResult> CreateOrUpdate(MapDto model)
        {
            if (model.Id != null)
            {
                var currentMap = _unitOfWork.MapRepo.Get(model.Id.Value);
                if(currentMap == null) return new OperationResult(false, "Map not found", "");

                currentMap.Name = model.Name != string.Empty ? model.Name : currentMap.Name;
                currentMap.Coordinates = model.Coordinates != string.Empty ? model.Coordinates : currentMap.Coordinates;
                await _unitOfWork.SaveAsync();
                return new OperationResult(true, "Map data was saved", "");
            }

            var map = _unitOfWork.MapRepo.Insert(new Map() {Coordinates = model.Coordinates, Name = model.Name});
            await _unitOfWork.SaveAsync();
            return new OperationResult(true, "Ok", map.Id + " " + map.Coordinates);
        }

        public async Task<OperationResult> AddPhoto(MapPhotoDto model)
        {
            var map = _unitOfWork.MapRepo.Get(model.MapId);
            if (map == null) return new OperationResult(false, "Map not found", "");
            var photo = await _photoService.AddPhoto(model.Photo);
            var res = _unitOfWork.MapIconRepo.Insert(new MapIcon()
            {
                Icon = photo,
                Map = map,
                Title = model.Title
            });
            await _unitOfWork.SaveAsync();
            return new OperationResult(true, "", "");
        }

        public IEnumerable<MapDto> AllMap()
        {
            var res = _unitOfWork.MapRepo.Get("Photos.Icon").ToList();
            return _mapper.Map<IEnumerable<MapDto>>(res.AsEnumerable());
        }

        public MapDto Get(Guid id)
        {
            return _mapper.Map<MapDto>(_unitOfWork.MapRepo.Get().First());
        }

    }
}
