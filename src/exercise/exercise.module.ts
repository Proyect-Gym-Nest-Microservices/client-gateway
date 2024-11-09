import { Module } from '@nestjs/common';
import { ExerciseController } from './exercise.controller';
import { NatsModule } from 'src/transports/nats.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ExerciseController],
  imports:[NatsModule,AuthModule]  
})
export class ExerciseModule {}
