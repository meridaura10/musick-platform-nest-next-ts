import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const start = async () => {
  try {
    const PORT = process.env.PORT || 4444;
    const app = await NestFactory.create(AppModule,{cors: false});
    app.enableCors({
      origin: '*',
      methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
    await app.listen(PORT, () => {
      console.log(`server started on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start()
