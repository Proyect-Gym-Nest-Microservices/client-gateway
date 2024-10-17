import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { NatsModule } from 'src/transports/nats.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UserController],
  imports: [NatsModule, AuthModule],

})
export class UserModule {}
