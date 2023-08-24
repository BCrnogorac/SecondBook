using Microsoft.Extensions.Configuration;

namespace SecondBook.Services.Extensions
{
    public static class ConfigExtensions
    {
        public static T GetSection<T>(this IConfiguration config, string sectionName) where T : class
        {
            return config.GetSection(sectionName).Get<T>();
        }
    }
}
