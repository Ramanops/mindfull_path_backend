import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: any) {
    console.log('BODY RECEIVED =>', body);

    if (!body) {
      return { error: 'Send JSON body with Content-Type application/json' };
    }

    const { name, email, password } = body;
    return this.authService.register(name, email, password);
  }

  @Post('login')
  login(@Body() body: any) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }
}
