using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BattleTanks.DB.Migrations
{
    public partial class someChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Maps_Photos_WallIconId",
                table: "Maps");

            migrationBuilder.DropIndex(
                name: "IX_Maps_WallIconId",
                table: "Maps");

            migrationBuilder.DropColumn(
                name: "WallIconId",
                table: "Maps");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "WallIconId",
                table: "Maps",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Maps_WallIconId",
                table: "Maps",
                column: "WallIconId");

            migrationBuilder.AddForeignKey(
                name: "FK_Maps_Photos_WallIconId",
                table: "Maps",
                column: "WallIconId",
                principalTable: "Photos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
