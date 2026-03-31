import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCreateDto, AuthUpdateDto, LoginDto } from './auth.dto';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async signIn(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Post()
  create(@Body() createAccDto: AuthCreateDto) {
    return this.authService.create(createAccDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccDto: AuthUpdateDto) {
    return this.authService.update(id, updateAccDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
