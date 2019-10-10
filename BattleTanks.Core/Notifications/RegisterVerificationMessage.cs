using BattleTanks.Core.DTOs;
using MediatR;

namespace BattleTanks.Core.Notifications
{
    public class RegisterVerificationMessage : INotification
    {
        public UserDto User { get; }

        public RegisterVerificationMessage(UserDto userDto)
        {
            User = userDto;
        }
    }
}
