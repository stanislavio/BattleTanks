using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BattleTanks.DB.Migrations
{
    public partial class ChangeGameTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Maps_MapId",
                table: "Photos");

            migrationBuilder.DropIndex(
                name: "IX_Photos_MapId",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "MapId",
                table: "Photos");

            migrationBuilder.AddColumn<bool>(
                name: "Online",
                table: "Games",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Online",
                table: "Games");

            migrationBuilder.AddColumn<Guid>(
                name: "MapId",
                table: "Photos",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Photos_MapId",
                table: "Photos",
                column: "MapId");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Maps_MapId",
                table: "Photos",
                column: "MapId",
                principalTable: "Maps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
