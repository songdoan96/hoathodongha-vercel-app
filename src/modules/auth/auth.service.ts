/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCreateDto, AuthUpdateDto, LoginDto } from './auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password, fcm_token } = loginDto;
    const user = await this.findByUsername(username);
    if (user?.password !== password) {
      throw new UnauthorizedException({
        message: 'MSNV hoặc mật khẩu chưa đúng',
      });
    }
    const payload = {
      username: user.username,
      name: user.name,
      bophan: user.bophan,
    };
    // const payload = { sub: user.id, username: user.username };
    if (fcm_token)
      await this.prisma.user.update({
        where: { id: user.id },
        data: { fcm_token },
      });
    return {
      id: user.id,
      ...payload,
      token: await this.jwtService.signAsync(payload),
    };
  }
  async findByUsername(username: string) {
    return await this.prisma.user.findUnique({ where: { username } });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  create(createAccDto: AuthCreateDto) {
    return 'This action adds a new acc';
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  update(id: string, authUpdateDto: AuthUpdateDto) {
    return `This action updates a #${id} acc`;
  }

  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
