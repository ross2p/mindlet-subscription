import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { GrpcOptions, KafkaOptions, Transport } from '@nestjs/microservices';
import {
  SUBSCRIPTION_GRPC_LOADER_OPTIONS,
  SUBSCRIPTION_GRPC_PACKAGES,
  SUBSCRIPTION_GRPC_PROTO_PATHS,
} from '@ross2p/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Subscription');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Fire-and-forget events only — synchronous RPC is served over gRPC below.
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

  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      package: SUBSCRIPTION_GRPC_PACKAGES,
      protoPath: SUBSCRIPTION_GRPC_PROTO_PATHS,
      loader: SUBSCRIPTION_GRPC_LOADER_OPTIONS,
      url:
        configService.get<string>('SUBSCRIPTION_GRPC_URL') ?? '0.0.0.0:50058',
    },
  });

  await app.startAllMicroservices();

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  logger.log(`🚀 Application is running on port ${port}`);
}

void bootstrap();
