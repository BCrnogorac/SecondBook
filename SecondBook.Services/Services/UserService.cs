﻿using AutoMapper;
using SecondBook.EF.Database;
using SecondBook.EF.Database.Models;
using SecondBook.Services.Models.BM;
using SecondBook.Services.Models.DTO;
using System.Security.Cryptography;

namespace SecondBook.Services.Services
{
    public class UserService : BaseService
    {
        private IdentityService identityService;
        public UserService(SecondBookDBContext dbContext, IdentityService identityService, IMapper mapper) : base(dbContext, mapper)
        {
            this.identityService = identityService;
        }

        public IEnumerable<User> GetUsers()
        {
            return dbContext.Users;
        }

        public TokenDTO? Login(LoginBM model)
        {
            var user = dbContext.Users.Where(u => u.Email == model.Email).FirstOrDefault();

            if (user == null || !IsPasswordValid(model.Password, user.HashedPassword))
            {
                return null;
            }

            return identityService.GetToken(user);
        }

        public void Register(RegisterBM model)
        {
            var user = mapper.Map<User>(model);

            dbContext.Users.Add(user);
            dbContext.SaveChanges();
        }

        public static string HashPassword(string password)
        {
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);

            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 100000);
            byte[] hash = pbkdf2.GetBytes(20);

            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);

            return Convert.ToBase64String(hashBytes);
        }

        private bool IsPasswordValid(string password, string savedPasswordHash)
        {
            if (string.IsNullOrEmpty(password)) { return false; }

            /* Extract the bytes */
            byte[] hashBytes = Convert.FromBase64String(savedPasswordHash);
            /* Get the salt */
            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);
            /* Compute the hash on the password the user entered */
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 100000);
            byte[] hash = pbkdf2.GetBytes(20);
            /* Compare the results */
            for (int i = 0; i < 20; i++)
            {
                if (hashBytes[i + 16] != hash[i])
                {
                    return false;
                }
            }

            return true;
        }
    }
}
