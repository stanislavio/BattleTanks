using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BattleTanks.DB.Migrations
{
    public partial class addMoney : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Money",
                table: "Users",
                nullable: false,
                defaultValue: 1000,
                oldClrType: typeof(int));  
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
                migrationBuilder.AlterColumn<int>(
                name: "Money",
                table: "Users",
                nullable: false,
                oldClrType: typeof(int),
                oldDefaultValue: 1000);
        }
    }
}
