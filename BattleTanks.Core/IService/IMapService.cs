using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BattleTanks.Core.DTO;
using BattleTanks.Core.Infrastructure;
using BattleTanks.DB.Entities;

namespace BattleTanks.Core.IService
{
    public interface IMapService
    {
        Task<OperationResult> CreateOrUpdate(MapDto model);
        IEnumerable<Map> AllMap();
        MapDto Get(Guid id);

    }
}
