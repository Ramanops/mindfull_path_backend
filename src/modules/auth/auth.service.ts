import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // ---------------- REGISTER ----------------
  async register(email: string, password: string, securityAnswer?: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Hash the security answer (lowercased + trimmed for flexibility)
    let securityAnswerHash: string | undefined;
    if (securityAnswer && securityAnswer.trim().length > 0) {
      securityAnswerHash = await bcrypt.hash(
        securityAnswer.trim().toLowerCase(),
        10,
      );
    }

    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        ...(securityAnswerHash ? { securityAnswerHash } : {}),
      },
    });

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return {
      accessToken: token,
    };
  }

  // ---------------- LOGIN ----------------
  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(
      password,
      user.passwordHash,
    );

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return {
      accessToken: token,
    };
  }

  // ---------------- VERIFY SECURITY ANSWER ----------------
  async verifySecurityAnswer(email: string, securityAnswer: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('No account found with this email');
    }

    if (!user.securityAnswerHash) {
      throw new BadRequestException(
        'No security question set for this account',
      );
    }

    const isMatch = await bcrypt.compare(
      securityAnswer.trim().toLowerCase(),
      user.securityAnswerHash,
    );

    if (!isMatch) {
      throw new UnauthorizedException('Incorrect answer');
    }

    return { verified: true };
  }

  // ---------------- RESET PASSWORD ----------------
  async resetPassword(
    email: string,
    securityAnswer: string,
    newPassword: string,
  ) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('No account found with this email');
    }

    if (!user.securityAnswerHash) {
      throw new BadRequestException(
        'No security question set for this account',
      );
    }

    const isMatch = await bcrypt.compare(
      securityAnswer.trim().toLowerCase(),
      user.securityAnswerHash,
    );

    if (!isMatch) {
      throw new UnauthorizedException('Incorrect answer');
    }

    if (newPassword.length < 6) {
      throw new BadRequestException(
        'Password must be at least 6 characters',
      );
    }

    const newHash = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { email },
      data: { passwordHash: newHash },
    });

    return { message: 'Password reset successfully' };
  }
}