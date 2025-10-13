import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthUpdateDto, LoginDto, AuthCreateDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signIn(body: LoginDto): Promise<{ token: string }> {
    const { username, password } = body;
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
    return {
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

  async findOne(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }
  async update(id: string, authUpdateDto: AuthUpdateDto) {
    return await this.prisma.user.update({
      where: { id },
      data: authUpdateDto,
    });
  }

  async create(authCreateDto: AuthCreateDto) {
    return await this.prisma.user.create({ data: authCreateDto });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
