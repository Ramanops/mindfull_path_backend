import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(name: string, email: string, password: string) {
    const hash = await bcrypt.hash(password, 12);
    return this.prisma.user.create({
      data: { name, email, passwordHash: hash },
    });
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new Error('Invalid password');

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '15m',
    });

    return { token };
  }
}