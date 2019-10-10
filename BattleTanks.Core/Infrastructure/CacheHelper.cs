using System;
using System.Collections.Generic;
using System.Text;
using BattleTanks.Core.DTOs;                
using MediatR;               
using System.Runtime.Caching;

namespace BattleTanks.Core.Infrastructure
{
    public class CacheHelper : ICacheHelper
    {
        public CacheDto GetValue(Guid userId)
        {               
            var memoryCache = MemoryCache.Default;
            var res = memoryCache.Get(userId.ToString());
            return res as CacheDto;
        }

        public bool Add(CacheDto value)
        {
            var memoryCache = MemoryCache.Default;
            return memoryCache.Add(value.UserId.ToString(), value, DateTime.Now.AddDays(10));
        }

        public void Update(CacheDto value)
        {
            var memoryCache = MemoryCache.Default;
            memoryCache.Set(value.UserId.ToString(), value, DateTime.Now.AddDays(10));
        }

        public void Delete(Guid userId)
        {
            var memoryCache = MemoryCache.Default;
            if (memoryCache.Contains(userId.ToString()))
            {
                memoryCache.Remove(userId.ToString());
            }
        }
    }
}
