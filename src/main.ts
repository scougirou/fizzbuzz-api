import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HOST, PORT, SCHEME } from './config/config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Fizzbuzz API')
    .setDescription('Sandbox Fizzbuzz API project')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(PORT).then(() => {
    console.log(
      `App listening on port ${PORT}, swagger available on ${SCHEME}://${HOST}:${PORT}/swagger`,
    );
  });
}
bootstrap();
