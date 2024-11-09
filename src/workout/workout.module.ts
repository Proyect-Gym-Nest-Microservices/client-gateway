import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { NatsModule } from 'src/transports/nats.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [WorkoutController],
  imports:[NatsModule,AuthModule]  
})
export class WorkoutModule {}
