using System;
using System.Drawing;
using System.IO;
using System.Threading.Tasks;
using BattleTanks.Core.Extensions;
using BattleTanks.Core.Infrastructure;
using BattleTanks.Core.IService;
using BattleTanks.DB.Entities;
using BattleTanks.DB.IRepo;
using ImageProcessor;
using ImageProcessor.Imaging;
using ImageProcessor.Imaging.Formats;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace BattleTanks.Core.Service
{
    public class PhotoService : IPhotoService
    {
        private readonly IUoW _unitOfWork;
        private readonly IOptions<ImageOptionsModel> _widthOptions;

        public PhotoService(
            IUoW uow,
            IOptions<ImageOptionsModel> opt
            )
        {
            _unitOfWork = uow;
            _widthOptions = opt;
        }

        public async Task<Photo> AddPhoto(IFormFile uploadedFile)
        {
            if (!IsValidImage(uploadedFile))
            {
                throw new ArgumentException();
            }

            byte[] imgData;
            using (var reader = new BinaryReader(uploadedFile.OpenReadStream()))
            {
                imgData = reader.ReadBytes((int)uploadedFile.Length);
            }

            var photo = new Photo
            {
                Thumb = Resize(imgData, _widthOptions.Value.Thumbnail),
                Img = Resize(imgData, _widthOptions.Value.Image),
            };

            _unitOfWork.PhotoRepo.Insert(photo);
            await _unitOfWork.SaveAsync();

            return photo;
        }


        public async Task Delete(Guid id)
        {
            var photo = _unitOfWork.PhotoRepo.Get(id);
            if (photo != null)
            {
                _unitOfWork.PhotoRepo.Delete(photo);
                await _unitOfWork.SaveAsync();
            }
        }
                 
        private static bool IsValidImage(IFormFile file) => (file != null && file.IsImage());


        private static byte[] Resize(byte[] originalImage, int width)
        {
            using (var originalImageStream = new MemoryStream(originalImage))
            {
                using (var resultImage = new MemoryStream())
                {
                    using (var imageFactory = new ImageFactory())
                    {
                        var createdImage = imageFactory.Load(originalImageStream);

                        if (createdImage.Image.Width > width)
                        {
                            createdImage = createdImage.Resize(new ResizeLayer(new Size(width, 0), ResizeMode.Max));
                        }
                        createdImage.Format(new JpegFormat())
                            .Save(resultImage);
                    }

                    return resultImage.GetBuffer();
                }
            }
        }

    }
    
}
