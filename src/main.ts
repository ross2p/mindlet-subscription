import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Subscription');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice<KafkaOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [configService.get<string>('KAFKA_BROKER')!],
        clientId: 'subscription-client',
      },
      consumer: {
        groupId: 'subscription-consumer',
        allowAutoTopicCreation: true,
      },
      subscribe: {
        fromBeginning: true,
      },
    },
  });

  await app.startAllMicroservices();

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  logger.log(`🚀 Application is running on port ${port}`);
}

void bootstrap();
