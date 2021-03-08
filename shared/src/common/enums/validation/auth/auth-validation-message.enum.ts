import { AuthValidationRule } from "./auth-validation-rule.enum";

const AuthValidationMessage =  {
  EMAIL_INCORRECT: 'Email is incorrect',
  EMAIL_REQUIRED: 'Email is required',
  PASSWORD_MIN_LENGTH: `Password must have at least ${AuthValidationRule.PASSWORD_MIN_LENGTH} characters`,
  PASSWORD_REQUIRED: 'Password is required',
} as const;

export { AuthValidationMessage };
