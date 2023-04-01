import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
const start = async () => {
  try {
    const PORT = process.env.PORT || 4444;
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });
    await app.listen(PORT, () => {
      console.log(`server started on PORT ${PORT}`);
    });
  } catch (error) {
    console.log('startind error:',error);
  }
};
start() 