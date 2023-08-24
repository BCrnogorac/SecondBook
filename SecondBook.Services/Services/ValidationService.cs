using FluentValidation;
using FluentValidation.Results;
using SecondBook.EF.Database;
using SecondBook.Services.Models.BM;
using SecondBook.Services.Validators;

namespace SecondBook.Services.Services
{
    public class ValidationService : BaseService
    {
        public ValidationService(SecondBookDBContext dbContext) : base(dbContext) { }

        public async Task<ValidationResult> ValidateRegister(RegisterBM model)
        {
            return await ValidateAsync(model, new RegisterBMValidator(dbContext));
        }

        public async static Task<ValidationResult> ValidateAsync<T, U>(T model, U validator)
            where T : class
            where U : AbstractValidator<T>
        {
            return await validator.ValidateAsync(model);
        }

        public static ValidationResult Validate<T, U>(T model, U validator)
            where T : class
            where U : AbstractValidator<T>
        {
            return validator.Validate(model);
        }
    }
}
