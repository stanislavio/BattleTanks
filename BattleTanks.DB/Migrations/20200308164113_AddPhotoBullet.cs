using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BattleTanks.DB.Migrations
{
    public partial class AddPhotoBullet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "PhotoId",
                table: "Bullets",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bullets_PhotoId",
                table: "Bullets",
                column: "PhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bullets_Photos_PhotoId",
                table: "Bullets",
                column: "PhotoId",
                principalTable: "Photos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bullets_Photos_PhotoId",
                table: "Bullets");

            migrationBuilder.DropIndex(
                name: "IX_Bullets_PhotoId",
                table: "Bullets");

            migrationBuilder.DropColumn(
                name: "PhotoId",
                table: "Bullets");
        }
    }
}
