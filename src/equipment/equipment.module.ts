import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { AuthModule } from 'src/auth/auth.module';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [EquipmentController],
  imports:[AuthModule,NatsModule]
})
export class EquipmentModule {}
