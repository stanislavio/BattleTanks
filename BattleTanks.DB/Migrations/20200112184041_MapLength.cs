using Microsoft.EntityFrameworkCore.Migrations;

namespace BattleTanks.DB.Migrations
{
    public partial class MapLength : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Coordinates",
                table: "Maps",
                maxLength: 1048,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Coordinates",
                table: "Maps",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 1048,
                oldNullable: true);
        }
    }
}
