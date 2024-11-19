import { Module } from '@nestjs/common';
import { NutritionController } from './nutrition.controller';
import { AuthModule } from 'src/auth/auth.module';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [NutritionController],
  imports:[AuthModule,NatsModule]
})
export class NutritionModule {}
