import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NatsModule } from './transports/nats.module';
import { UserModule } from './user/user.module';
import { WorkoutModule } from './workout/workout.module';
import { ExerciseModule } from './exercise/exercise.module';
import { TrainingPlanModule } from './training-plan/training-plan.module';
import { MuscleGroupModule } from './muscle-group/muscle-group.module';

@Module({
  imports: [AuthModule, NatsModule, UserModule, WorkoutModule, ExerciseModule, TrainingPlanModule, MuscleGroupModule],

})
export class AppModule {}
