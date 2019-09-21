﻿// <auto-generated />
using System;
using BattleTanks.DB.EF;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BattleTanks.DB.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20190921201349_InitDatabase")]
    partial class InitDatabase
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.11-servicing-32099")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("BattleTanks.DB.Entities.Photo", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<byte[]>("Img");

                    b.Property<byte[]>("Thumb");

                    b.HasKey("Id");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("BattleTanks.DB.Entities.Role", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("BattleTanks.DB.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<bool>("EmailConfirmed");

                    b.Property<byte>("Gender");

                    b.Property<bool>("IsBlocked");

                    b.Property<string>("Nickname");

                    b.Property<string>("PasswordHash");

                    b.Property<Guid?>("PhotoId");

                    b.Property<Guid>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("PhotoId");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("BattleTanks.DB.Entities.User", b =>
                {
                    b.HasOne("BattleTanks.DB.Entities.Photo", "Photo")
                        .WithMany()
                        .HasForeignKey("PhotoId");

                    b.HasOne("BattleTanks.DB.Entities.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
