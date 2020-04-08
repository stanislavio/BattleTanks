using Microsoft.EntityFrameworkCore.Migrations;

namespace BattleTanks.DB.Migrations
{
    public partial class GameAddBetMigra : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Bet",
                table: "Games",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Bet",
                table: "Games");
        }
    }
}
