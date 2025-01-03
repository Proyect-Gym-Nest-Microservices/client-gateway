import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NatsModule } from './transports/nats.module';
import { UserModule } from './user/user.module';
import { WorkoutModule } from './workout/workout.module';
import { ExerciseModule } from './exercise/exercise.module';
import { TrainingPlanModule } from './training-plan/training-plan.module';
import { MuscleGroupModule } from './muscle-group/muscle-group.module';
import { EquipmentModule } from './equipment/equipment.module';
import { NutritionModule } from './nutrition/nutrition.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [AuthModule, NatsModule, UserModule, WorkoutModule, ExerciseModule, TrainingPlanModule, MuscleGroupModule, EquipmentModule, NutritionModule, AnalyticsModule, RatingModule],

})
export class AppModule {}
