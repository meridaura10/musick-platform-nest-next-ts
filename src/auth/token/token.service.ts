import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import { Token, TokenDocument } from '../schemas/token-schema';
import { Model } from 'mongoose';
@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
  ) {}
  generateTokens(payload) {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET || 'secret',
      { expiresIn: '15m' },
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET || 'secret',
      { expiresIn: '30d' },
    );
    return {
      accessToken,
      refreshToken,
    };
  }
  async validToken(token: string) { 
    
    try {     
      const decoded = jwt.verify(token,'secret');            
      return decoded;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async findToken(refreshToken: string) {
    const token = await this.tokenModel.findOne({
      refreshToken,
    });
    return token.refreshToken
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await this.tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await this.tokenModel.create({ user: userId, refreshToken });
    return token;
  }
  async removeToken(refreshToken) {
    return await this.tokenModel.deleteOne({ refreshToken });
  }
}
