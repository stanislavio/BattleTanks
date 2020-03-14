using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BattleTanks.Core.DTOs;
using BattleTanks.Core.Infrastructure;
using BattleTanks.DB.Entities;

namespace BattleTanks.Core.IService
{
    public interface IMapService
    {
        Task<OperationResult> CreateOrUpdate(MapDto model);
        IEnumerable<MapDto> AllMap();
        MapDto Get(Guid id);
        Task<OperationResult> AddPhoto(MapPhotoDto model);
        Task<OperationResult> DeletePhoto(Guid id);
    }
}
