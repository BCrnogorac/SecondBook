using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using SecondBook.EF.Database;
using SecondBook.Services;
using SecondBook.Services.Extensions;
using SecondBook.Services.Models;
using SecondBook.Services.Services;
using System.Security.Claims;
using System.Text;


namespace SecondBook.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services
            builder.Services.AddControllers();
            builder.Services.AddDbContext<SecondBookDBContext>();
            builder.Services.AddScoped<UserService>();
            builder.Services.AddScoped<ValidationService>();
            builder.Services.AddScoped<IdentityService>();
            builder.Services.AddScoped<CategoryService>();
            builder.Services.AddScoped<BookService>();
            builder.Services.AddScoped<AuthorService>();
            builder.Services.AddAutoMapper(typeof(MappingProfile));

            var jwtSettings = builder.Configuration.GetSection<JwtSettings>(GlobalConstants.JWT_SETTINGS_KEY);

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: GlobalConstants.CORS_POLICY,
                                  policy =>
                                  {
                                      policy.WithOrigins(GlobalConstants.SPA_URL)
                                      .AllowAnyHeader()
                                      .AllowAnyMethod()
                                      .AllowCredentials();
                                  });
            });

            builder.Services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = jwtSettings.Issuer,
                    ValidAudience = jwtSettings.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key)),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = true,
                    RoleClaimType = ClaimTypes.Role
                };
            });

            var app = builder.Build();

            // Configure middleware
            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseRouting();
            app.UseCors(GlobalConstants.CORS_POLICY);
            app.UseAuthorization();

            app.MapControllers();

            app.UseStaticFiles(); // Serve static files from wwwroot folder

            app.Run();
        }
    }
}