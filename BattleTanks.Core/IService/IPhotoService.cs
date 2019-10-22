using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BattleTanks.DB.Entities;
using Microsoft.AspNetCore.Http;

namespace BattleTanks.Core.IService
{
    public interface IPhotoService
    {
        Task<Photo> AddPhoto(IFormFile uploadedFile);
        Task Delete(Guid id);
    }
}
