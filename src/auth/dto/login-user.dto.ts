import { IsEmail, IsNotEmpty } from "class-validator";

export class loginDto {
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  password: string;
}
