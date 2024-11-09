import { Module } from '@nestjs/common';
import { TrainingPlanController } from './training-plan.controller';
import { NatsModule } from 'src/transports/nats.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TrainingPlanController],
  imports:[NatsModule,AuthModule]
})
export class TrainingPlanModule {}
