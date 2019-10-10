using System;
using System.Collections.Generic;
using System.Text;
using BattleTanks.Core.DTOs;

namespace BattleTanks.Core.Infrastructure
{
    public interface ICacheHelper
    {
        CacheDto GetValue(Guid userId);
        bool Add(CacheDto value);
        void Update(CacheDto value);
        void Delete(Guid userId);
    }
}
