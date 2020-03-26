using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BattleTanks.DB.Migrations
{
    public partial class ChangeSomethingInDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Died",
                table: "UserGames");

            migrationBuilder.AddColumn<int>(
                name: "DiedCount",
                table: "UserGames",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastShoot",
                table: "UserGames",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "RechargeTime",
                table: "Tanks",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DiedCount",
                table: "UserGames");

            migrationBuilder.DropColumn(
                name: "LastShoot",
                table: "UserGames");

            migrationBuilder.DropColumn(
                name: "RechargeTime",
                table: "Tanks");

            migrationBuilder.AddColumn<bool>(
                name: "Died",
                table: "UserGames",
                nullable: false,
                defaultValue: false);
        }
    }
}
