namespace SecondBook.Services.Enums
{
    public class Role
    {
        public const string Customer = "Customer";
        public const string Admin = "Admin";

        public static bool ValidRole(string role)
        {
            if (string.IsNullOrEmpty(role))
            {
                return false;
            }

            var roles = new List<string>() { Customer, Admin };

            return roles.Contains(role, StringComparer.OrdinalIgnoreCase);
        }
    }
}
