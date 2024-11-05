import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NatsModule } from './transports/nats.module';
import { UserModule } from './user/user.module';
import { TrainingModule } from './training/training.module';

@Module({
  imports: [AuthModule, NatsModule, UserModule, TrainingModule],

})
export class AppModule {}
