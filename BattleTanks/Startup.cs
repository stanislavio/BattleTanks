using BattleTanks.DB.EF;

using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;       
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using BattleTanks.Core.Infrastructure;
using System;
using System.Threading.Tasks;
using BattleTanks.DB.Repo;
using BattleTanks.Core.Service;
using BattleTanks.DB.IRepo;
using BattleTanks.Core.IService;
using BattleTanks.Mapping;
using System.Reflection;
using BattleTanks.Core.NotificationHandlers;
using MediatR;

namespace BattleTanks
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
                     
            #region Authorization and Autontification configuring...

            var signingKey = new SigningSymmetricKey(Configuration.GetValue<string>("JWTOptions:SecretKey"));

            services.AddSingleton<IJwtSigningEncodingKey>(signingKey);

            var signingDecodingKey = (IJwtSigningDecodingKey)signingKey;

            services
                .AddMemoryCache()
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = signingDecodingKey.GetKey(),

                        ValidateIssuer = false,
                        ValidateAudience = false,

                        ValidateLifetime = true,

                        ClockSkew = TimeSpan.FromSeconds(5)
                    };
                    //options.Events = new JwtBearerEvents
                    //{
                    //    OnMessageReceived = context =>
                    //    {
                    //        var accessToken = context.Request.Query["access_token"];

                    //        // If the request is for our hub...
                    //        var path = context.HttpContext.Request.Path;
                    //        if (!string.IsNullOrEmpty(accessToken))
                    //        {
                    //            // Read the token out of the query string
                    //            context.Token = accessToken;
                    //        }
                    //        return Task.CompletedTask;
                    //    }
                    //};
                });

            #endregion


            #region Configure our services...

            services.AddTransient<IUoW, UnitOfWork>();     
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IRoleService, RoleService>();    
            services.AddTransient<IPhotoService, PhotoService>();
            services.AddTransient<IEmailService, EmailService>();
            services.AddTransient<IMapService, MapService>();


            services.AddSingleton<ICacheHelper, CacheHelper>();

            services.AddMediatR(typeof(RegisterVerificationHandler).Assembly);

            services.Configure<EmailOptionsModel>(Configuration.GetSection("EmailSenderOptions"));
            //services.Configure<ImageOptionsModel>(Configuration.GetSection("ImageWidths"));

            #endregion

            services.AddAutoMapper(typeof(AutoMapperProfile).GetTypeInfo().Assembly);
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(Configuration
                    .GetConnectionString("DefaultConnection")));


            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
            app.UseAuthentication();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
