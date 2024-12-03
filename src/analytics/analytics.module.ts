import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AuthModule } from 'src/auth/auth.module';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [AnalyticsController],
  imports:[AuthModule, NatsModule]
})
export class AnalyticsModule {}
