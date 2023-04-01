import { HttpException, Injectable } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user-schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from 'src/auth/email/email.service';
import { TokenService } from './token/token.service';
import { loginDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private mailService: EmailService,
    private tokenService: TokenService,
  ) {}
  async registration(dto: createUserDto) {
    try {
      const candidate = await this.userModel.findOne({ email: dto.email });
      if (candidate) {
        throw new HttpException(
          `користувач з токою поштою: ${dto.email} вже існує `,
          401,
        );
      }
      const hashPassword = await bcrypt.hash(dto.password, 3);
      const activationLink: string = uuidv4();
      const user = await this.userModel.create({
        email: dto.email,
        password: hashPassword,
        activationLink,
        isActivated: false,
        name: dto.name,
        tracks: [],
      });
      const userDto = {
        email: dto.email,
        id: user._id,
        isActivated: false,
        name: dto.name,
        tracks: [],
      };
      await this.mailService.sendActivationMail(dto.email, activationLink);
      const tokens = this.tokenService.generateTokens(userDto);
      await this.tokenService.saveToken(user._id, tokens.refreshToken);
      return {
        ...tokens,
        user: userDto,
      };
    } catch (error) {      
      throw new HttpException(error.message, error.status); // Передача помилки до middleware
    }
  }

  async login(dto: loginDto) {
    try {
      const user = await this.userModel.findOne({ email: dto.email }).populate('tracks')
      if (!user) {
        throw new HttpException('користувача з такою поштою не знайдено',401)
      }
      const isPassEquals = await bcrypt.compare(dto.password, user.password);
      if (!isPassEquals) {
        throw new HttpException('не вірно введений пароль',401)
      }
      const userDto = {
        email: user.email,
        id: user._id,
        isActivated: false,
        name: user.name,
        tracks: user.tracks
      };
      const tokens = this.tokenService.generateTokens(userDto);
      await this.tokenService.saveToken(user._id, tokens.refreshToken);
  
      return { ...tokens, user: userDto };
    } catch (error) {
      throw new HttpException(error.message,error.status)
    }
  }

  async logout(refresh: string) {
    try {
      return await this.tokenService.removeToken(refresh);
    } catch (error) {
      throw new HttpException('сталась помилка при виході з акаунту',500)
    }
  }

  async activate() {}

  async refresh(token: string) {
    try {
      if (!token) {
        throw new HttpException('не має токену',401)
      }
      const userData = await this.tokenService.validToken(token);
      
      const tokenFromdb = await this.tokenService.findToken(token);
      if (!userData || !tokenFromdb) {
        throw new HttpException('токен не валідний або не був знайдений',500)
      }
      const user = await this.userModel.findById(userData.id).populate('tracks');
      const userDto = {
        email: user.email,
        id: user._id,
        isActivated: false,
        name: user.name,
        tracks: user.tracks
      };
      const tokens = await this.tokenService.generateTokens(userDto);
      await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
      return {
        ...tokens,
        user: userDto,
      };
    } catch (error) {
      throw new HttpException(error.message,error.status)
    }
  }
}
