import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const start = async () => {
  try {
    const PORT = process.env.PORT || 4444;
    const app = await NestFactory.create(AppModule);
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
      next();
    });
  
    app.enableCors({
      allowedHeaders: '*',
      origin: '*',
    });
    await app.listen(PORT, () => {
      console.log(`server started on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start()
