using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BattleTanks.DB.Migrations
{
    public partial class SomeChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "MapId",
                table: "Photos",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "MapIcons",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    MapId = table.Column<Guid>(nullable: false),
                    IconId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MapIcons", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MapIcons_Photos_IconId",
                        column: x => x.IconId,
                        principalTable: "Photos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MapIcons_Maps_MapId",
                        column: x => x.MapId,
                        principalTable: "Maps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Photos_MapId",
                table: "Photos",
                column: "MapId");

            migrationBuilder.CreateIndex(
                name: "IX_MapIcons_IconId",
                table: "MapIcons",
                column: "IconId");

            migrationBuilder.CreateIndex(
                name: "IX_MapIcons_MapId",
                table: "MapIcons",
                column: "MapId");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Maps_MapId",
                table: "Photos",
                column: "MapId",
                principalTable: "Maps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Maps_MapId",
                table: "Photos");

            migrationBuilder.DropTable(
                name: "MapIcons");

            migrationBuilder.DropIndex(
                name: "IX_Photos_MapId",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "MapId",
                table: "Photos");
        }
    }
}
