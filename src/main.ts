import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
const start = async () => {
  try {
    const PORT = process.env.PORT || 4444;
    const app = await NestFactory.create(AppModule);
    //  app.use(cookieParser())
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
      origin: 'https://musick-platform-nest-next-ts-front-end-git-client-meridaura10.vercel.app',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });
    await app.listen(PORT, () => {
      console.log(`server started on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start()