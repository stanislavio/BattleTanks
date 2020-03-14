using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BattleTanks.Core.DTOs;
using BattleTanks.Core.Infrastructure;

namespace BattleTanks.Core.IService
{
    public interface ITankService
    {
        Task<OperationResult> CreateOrUpdate(TankLoadDto model);
        TankDto Get(Guid id);
        IEnumerable<TankDto> All();
    }
}
