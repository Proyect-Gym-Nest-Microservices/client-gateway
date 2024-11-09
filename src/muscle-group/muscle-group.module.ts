import { Module } from '@nestjs/common';
import { MuscleGroupController } from './muscle-group.controller';
import { NatsModule } from 'src/transports/nats.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [MuscleGroupController],
  imports:[NatsModule,AuthModule]
})
export class MuscleGroupModule {}
