using Microsoft.EntityFrameworkCore.Migrations;

namespace BattleTanks.DB.Migrations
{
    public partial class AddMapAndTankNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Tanks",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Maps",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Tanks");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Maps");
        }
    }
}
