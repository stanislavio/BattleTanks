using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using BattleTanks.Core.DTOs;
using BattleTanks.Core.Infrastructure;
using BattleTanks.Core.IService;
using Microsoft.Extensions.Options;

namespace BattleTanks.Core.Service
{
    public class EmailService : IEmailService
    {
        private readonly IOptions<EmailOptionsModel> _senderOptions;

        public EmailService(IOptions<EmailOptionsModel> opt)
        {
            _senderOptions = opt;
        }
                                            
        public Task SendEmailAsync(EmailDto emailDto)
        {
            var from = _senderOptions.Value.Account;
            var pass = _senderOptions.Value.Password;

            var client = new SmtpClient
            {
                Host = _senderOptions.Value.Host,
                Port = _senderOptions.Value.Port,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = _senderOptions.Value.UseDefaultCredentials,
                Credentials = (!_senderOptions.Value.UseDefaultCredentials) ? new NetworkCredential(@from, pass) : null,
                EnableSsl = _senderOptions.Value.EnableSsl
            };

            var mail = new MailMessage(@from, emailDto.RecepientEmail)
            {
                Subject = emailDto.Subject,
                Body = emailDto.MessageText,
                IsBodyHtml = true,
            };
            return client.SendMailAsync(mail);
        }
    }
}
