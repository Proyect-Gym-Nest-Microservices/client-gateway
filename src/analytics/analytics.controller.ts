import { Body, Controller, Delete, Get, Inject, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { Period } from './enums/analytics.enum';
import { firstValueFrom } from 'rxjs';
import { EquipmentStatisticsDto } from './dto/equipment.statistics.dto';
import { MongoIdDto } from './dto/mongo-id.dto';
import { DatePeriodDto } from './dto/date-period.dto';
import { ExerciseStatisticsDto } from './dto/exercise-statistics-dto';
import { TrainingPlanStatisticsDto } from './dto/trainingplan-statistics.dto';
import { WorkoutStatisticsDto } from './dto/workout-statistics.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  //-Exercise Statistics Controller

  //@UseGuards(AuthGuard)
  //@Roles(Role.ADMIN_ROLE)
  @Post('generate/exercise-statistics')
  async generateExerciseStatistics(
    @Body() exerciseStatsDto: ExerciseStatisticsDto
  ) {
    try {
      const statistics = await firstValueFrom(
        this.client.send('generate.exercise.statistics', exerciseStatsDto)
      );
      return statistics;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  //@UseGuards(AuthGuard)
  //@Roles(Role.ADMIN_ROLE)
  @Get('get-exercise-statistics')
  async getExerciseStatistics(
    @Query() datePeriodDto: DatePeriodDto
  ) {
    try {
      const statistics = await firstValueFrom(
        this.client.send('get.exercise.statistics', datePeriodDto)
      );
      return statistics;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  //@UseGuards(AuthGuard)
  //@Roles(Role.ADMIN_ROLE)
  @Get('find/exercise-statistics/:id')
  async findExerciseStatsById(
    @Param() mongoIdDto: MongoIdDto
  ) {
    try {
      const statistics = await firstValueFrom(
        this.client.send('find.exercise.statistic.by.id', mongoIdDto)
      );
      return statistics;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  //@UseGuards(AuthGuard)
  //@Roles(Role.ADMIN_ROLE)
  @Delete('delete/exercise-statistic/:id')
  async deleteExerciseStatistics(
    @Param() mongoIdDto: MongoIdDto
  ) {
    try {
      return await firstValueFrom(
        this.client.send('delete.exercise.statistic.by.id', mongoIdDto)
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  //- Training Plan Statistics Controller

  //@UseGuards(AuthGuard)
  //@Roles(Role.ADMIN_ROLE)
  @Post('generate/training-plan-statistics')
  async generateTrainingPlanStatistics(
    @Body() trainingPlanStatsDto: TrainingPlanStatisticsDto
  ) {
    try {
      const statistics = await firstValueFrom(
        this.client.send('generate.training.plan.statistics', trainingPlanStatsDto)
      );
      return statistics;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  //@UseGuards(AuthGuard)
  //@Roles(Role.ADMIN_ROLE)
  @Get('get-training-plan-statistics')
  async getTrainingPlanStatistics(
    @Query() datePeriodDto: DatePeriodDto
  ) {
    try {
      const statistics = await firstValueFrom(
        this.client.send('get.training.plan.statistics', datePeriodDto)
      );
      return statistics;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  //@UseGuards(AuthGuard)
  //@Roles(Role.ADMIN_ROLE)
  @Get('find/training-plan-statistics/:id')
  async findTrainingPlanStatsById(
    @Param() mongoIdDto: MongoIdDto
  ) {
    try {
      const statistics = await firstValueFrom(
        this.client.send('find.training.plan.statistic.by.id', mongoIdDto)
      );
      return statistics;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  //@UseGuards(AuthGuard)
  //@Roles(Role.ADMIN_ROLE)
  @Delete('delete/training-plan-statistic/:id')
  async deleteTrainingPlanStatistics(
    @Param() mongoIdDto: MongoIdDto
  ) {
    try {
      return await firstValueFrom(
        this.client.send('delete.training.plan.statistic.by.id', mongoIdDto)
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  //- Workout Statistics Controller

  //@UseGuards(AuthGuard)
  //@Roles(Role.ADMIN_ROLE)
  @Post('generate/workout-statistics')
  async generateWorkoutStatistics(
    @Body() workoutStatsDto: WorkoutStatisticsDto
  ) {
    try {
      const statistics = await firstValueFrom(
        this.client.send('generate.workout.statistics', workoutStatsDto)
      );
      return statistics;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  //@UseGuards(AuthGuard)
  //@Roles(Role.ADMIN_ROLE)
  @Get('get-workout-statistics')
  async getWorkoutStatistics(
    @Query() datePeriodDto: DatePeriodDto
  ) {
    try {
      const statistics = await firstValueFrom(
        this.client.send('get.workout.statistics', datePeriodDto)
      );
      return statistics;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  //@UseGuards(AuthGuard)
  //@Roles(Role.ADMIN_ROLE)
  @Get('find/workout-statistics/:id')
  async findWorkoutStatsById(
    @Param() mongoIdDto: MongoIdDto
  ) {
    try {
      const statistics = await firstValueFrom(
        this.client.send('find.workout.statistic.by.id', mongoIdDto)
      );
      return statistics;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  //@UseGuards(AuthGuard)
  //@Roles(Role.ADMIN_ROLE)
  @Delete('delete/workout-statistic/:id')
  async deleteWorkoutStatistics(
    @Param() mongoIdDto: MongoIdDto
  ) {
    try {
      return await firstValueFrom(
        this.client.send('delete.workout.statistic.by.id', mongoIdDto)
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
  //- Equipment Statistics Controller

  //@UseGuards(AuthGuard)
  //@Roles(Role.ADMIN_ROLE)
  @Post('generate/equipment-statistics')
  async generateEquipmentStatistics(
    @Body() equipmentStatsDto: EquipmentStatisticsDto
  ) {
    try {
      const statistics = await firstValueFrom(
        this.client.send('generate.equipment.statistics', equipmentStatsDto)
      );
      return statistics;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  //@UseGuards(AuthGuard)
  //@Roles(Role.ADMIN_ROLE)
  @Get('get-equipment-statistics')
  async getEquipmentStatistics(
    @Query() datePeriodDto: DatePeriodDto
  ) {
    try {
      const statistics = await firstValueFrom(
        this.client.send('get.equipment.statistics', datePeriodDto)
      );
      return statistics;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  //@UseGuards(AuthGuard)
  //@Roles(Role.ADMIN_ROLE)
  @Get('find/equipment-statistics/:id')
  async findEquipmentStatsById(
    @Param() mongoIdDto: MongoIdDto
  ) {
    try {
      const statistics = await firstValueFrom(
        this.client.send('find.equipment.statistic.by.id', mongoIdDto)
      );
      return statistics;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  //@UseGuards(AuthGuard)
  //@Roles(Role.ADMIN_ROLE)
  @Delete('delete/equipment-statistic/:id')
  async deleteEquipmentStatistics(
    @Param() mongoIdDto: MongoIdDto
  ) {
    try {
      return await firstValueFrom(
        this.client.send('delete.equipment.statistic.by.id', mongoIdDto)
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  //-User Statistics Controller
  //@UseGuards(AuthGuard)
  //@Roles(Role.ADMIN_ROLE)
  @Post('generate-user-statistics')
  async generateUserStatistics(
    @Body() datePeriodDto: DatePeriodDto
  ) {
    try {
      const statistics = await firstValueFrom(
        this.client.send('generate.user.statistics', datePeriodDto)
      )
      return statistics;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  //@UseGuards(AuthGuard)
  //@Roles(Role.ADMIN_ROLE)
  @Get('get-user-statistics')
  async getUserStatistics(
    @Query('period') period: Period,
    @Query('date') date: Date
  ) {
    try {
      const statistics = await firstValueFrom(
        this.client.send('get.user.statistics', { period, date })
      )
      return statistics;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  //@UseGuards(AuthGuard)
  //@Roles(Role.ADMIN_ROLE)
  @Get('find/user-statistics/:id')
  async findUserStatsById(
    @Param() mongoIdDto: MongoIdDto
  ) {
    try {
      const statistics = await firstValueFrom(
        this.client.send('find.user.statistic.by.id', mongoIdDto)
      );
      return statistics;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  //@UseGuards(AuthGuard)
  //@Roles(Role.ADMIN_ROLE)
  @Delete('delete/user-statistic/:id')
  async deleteUserStatistics(
    @Param() mongoIdDto: MongoIdDto
  ) {
    try {
      return await firstValueFrom(
        this.client.send('delete.user.statistic.by.id', mongoIdDto)
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
