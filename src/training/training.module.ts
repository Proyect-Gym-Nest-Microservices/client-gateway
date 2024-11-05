import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { NatsModule } from 'src/transports/nats.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TrainingController],
  imports: [NatsModule, AuthModule],
})
export class TrainingModule {}
