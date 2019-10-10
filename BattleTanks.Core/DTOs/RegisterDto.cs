using System.ComponentModel.DataAnnotations;

namespace BattleTanks.Core.DTOs
{             
    public class RegisterDto
    {
        [Required]
        public string Nickname { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
