using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using BattleTanks.Core.DTOs;
using BattleTanks.Core.Infrastructure;
using BattleTanks.Core.IService;
using BattleTanks.Core.Notifications;
using MediatR;

namespace BattleTanks.Core.NotificationHandlers
{
    public class RegisterVerificationHandler : INotificationHandler<RegisterVerificationMessage>
    {
        private readonly IEmailService _sender;
        private readonly IUserService _userService;
        private readonly ICacheHelper _cacheHelper;

        public RegisterVerificationHandler(
            IEmailService sender,
            IUserService userSrv,
            ICacheHelper cacheHelper
        )
        {
            _sender = sender;
            _userService = userSrv;
            _cacheHelper = cacheHelper;
        }

        public async Task Handle(RegisterVerificationMessage notification, CancellationToken cancellationToken)
        { 
            var token = Guid.NewGuid().ToString();
            var theEmailLink = $"https://localhost:43214/confirm_email/{notification.User.Id.ToString()}/{token}";

            _cacheHelper.Add(new CacheDto
            {
                UserId = notification.User.Id,
                Token = token
            });

            try
            {
                await _sender.SendEmailAsync(new EmailDto
                {
                    Subject = "BattleTanks registration",
                    RecepientEmail = notification.User.Email,
                    MessageText = $"For confirm your email please follow the <a href='{theEmailLink}'>link</>"
                });

                var x = _cacheHelper.GetValue(notification.User.Id);

                Debug.WriteLine(x.Token);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
            }
        }
    }
}
