import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 3000;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT).then(() => {
    console.log(`App listening on port ${PORT}`);
  });
}
bootstrap();
