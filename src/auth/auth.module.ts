import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controllet";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user-schema";
import { EmailService } from "./email/email.service";
import { TokenModule } from "./token/token.module";
import { TokenService } from "./token/token.service";
import { Token, TokenSchema } from "./schemas/token-schema";

@Module({
    imports: [ 
        MongooseModule.forFeature([{name: User.name,schema: UserSchema}]), 
        MongooseModule.forFeature([{name: Token.name,schema: TokenSchema}]),
    ],
    controllers: [AuthController],
    providers: [AuthService,TokenService,EmailService],
})
export class AuthModule {

}