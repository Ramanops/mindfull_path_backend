import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ---------------- REGISTER ----------------
  @Post('register')
  register(
    @Body() body: { email: string; password: string; securityAnswer?: string },
  ) {
    return this.authService.register(
      body.email,
      body.password,
      body.securityAnswer,
    );
  }

  // ---------------- LOGIN ----------------
  @Post('login')
  login(
    @Body() body: { email: string; password: string },
  ) {
    return this.authService.login(
      body.email,
      body.password,
    );
  }

  // ---------------- VERIFY SECURITY ANSWER ----------------
  @Post('verify-security')
  verifySecurityAnswer(
    @Body() body: { email: string; securityAnswer: string },
  ) {
    return this.authService.verifySecurityAnswer(
      body.email,
      body.securityAnswer,
    );
  }

  // ---------------- RESET PASSWORD ----------------
  @Post('reset-password')
  resetPassword(
    @Body()
    body: { email: string; securityAnswer: string; newPassword: string },
  ) {
    return this.authService.resetPassword(
      body.email,
      body.securityAnswer,
      body.newPassword,
    );
  }
}