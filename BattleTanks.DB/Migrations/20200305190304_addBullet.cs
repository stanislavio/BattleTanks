using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BattleTanks.DB.Migrations
{
    public partial class addBullet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "BulletId",
                table: "Tanks",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Speed",
                table: "Tanks",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<int>(
                name: "Weight",
                table: "Tanks",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Bullets",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Speed = table.Column<float>(nullable: false),
                    Radius = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bullets", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tanks_BulletId",
                table: "Tanks",
                column: "BulletId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tanks_Bullets_BulletId",
                table: "Tanks",
                column: "BulletId",
                principalTable: "Bullets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tanks_Bullets_BulletId",
                table: "Tanks");

            migrationBuilder.DropTable(
                name: "Bullets");

            migrationBuilder.DropIndex(
                name: "IX_Tanks_BulletId",
                table: "Tanks");

            migrationBuilder.DropColumn(
                name: "BulletId",
                table: "Tanks");

            migrationBuilder.DropColumn(
                name: "Speed",
                table: "Tanks");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "Tanks");
        }
    }
}
