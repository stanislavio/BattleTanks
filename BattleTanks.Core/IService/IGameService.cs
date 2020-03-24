using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BattleTanks.Core.DTOs;
using BattleTanks.Core.Infrastructure;
using BattleTanks.DB.Entities;

namespace BattleTanks.Core.IService
{
    public interface IGameService
    {
        IEnumerable<TankerDto> GetPlayers(Guid gameId);
        Task<OperationResult> CreateGame(GameLoadDto model);
        IEnumerable<GameDto> GetGames();
        GameDto GetGameInfo(Guid gameId);
        IEnumerable<GamePreviewDto> FindGame();
        Task<OperationResult> SavePlayersInfo(List<PlayerInfoDto> model);
        Task<OperationResult> SaveCurrentMap(SaveGameInfo model);
        Task<OperationResult> JoinToGame(GameLoadDto model);
    }
}
