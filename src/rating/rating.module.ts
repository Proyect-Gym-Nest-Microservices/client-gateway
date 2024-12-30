import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { AuthModule } from 'src/auth/auth.module';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [RatingController],
  imports:[AuthModule,NatsModule]
})
export class RatingModule {}
