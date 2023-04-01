import {
  Body,
  Controller,
  Headers,
  HttpException,
  Post,
  Req,
  Request,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto } from './dto/create-user.dto';
import { loginDto } from './dto/login-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registration')
  async registration(@Body() dto: createUserDto, @Response() res) {
    const user = await this.authService.registration(dto);
    res.cookie('refreshToken', user.refreshToken, { httpOnly: true });
    res.json(user);
  }

  @Post('/login')
  async login(@Body() dto: loginDto, @Response() res) {
    const user = await this.authService.login(dto);
    res.cookie('refreshToken', user.refreshToken, { httpOnly: true });
    res.json(user);
  }

  @Post('/logout')
  async logout(@Request() req, @Response() res) {
    const token = await this.authService.logout(req.cookies.refreshToken);
    res.json(token);
  }

  @Post('/refresh')
  async refresh(@Headers() headers, @Response() res) {
    const cookieString = headers.cookie || '';
    const cookies = cookieString.split('; ').reduce((acc, curr) => {
      const [name, value] = curr.split('=');
      acc[name] = value;
      return acc;
    }, {});

    const refreshToken = cookies.refreshToken;

    
    const user = await this.authService.refresh(refreshToken);
    res.cookie('refreshToken', user.refreshToken, { httpOnly: true });
    res.json(user);
  }

  @Post('/activate/:link')
  activate() {}
}
