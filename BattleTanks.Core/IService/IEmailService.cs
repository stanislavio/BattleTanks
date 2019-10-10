using System.Threading.Tasks;
using BattleTanks.Core.DTOs;

namespace BattleTanks.Core.IService
{
    public interface IEmailService
    {                                        
        Task SendEmailAsync(EmailDto emailDto); 
    }
}
