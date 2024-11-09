import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/common/enums/roles.enum';
import { NATS_SERVICE } from 'src/config';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PaginationDto } from 'src/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';


@Controller('workout')
export class WorkoutController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE)
  @Post('create')
  async createWorkout(@Body() createWorkoutDto: CreateWorkoutDto) {
    try {
      const workout = await firstValueFrom(
        this.client.send('create.workout', createWorkoutDto)
      )
      return workout;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE,Role.USER_ROLE)
  @Get('find-all')
  async findAllWorkouts(@Query() paginationDto: PaginationDto) {
    try {
      const workouts = await firstValueFrom(
        this.client.send('find.all.Workouts', paginationDto)
      )
      return workouts;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE,Role.USER_ROLE)
  @Get('find-by-id/:id')
  async findWorkoutById(@Param('id', ParseIntPipe) id: number) {
    try {
      const response = await firstValueFrom(
        this.client.send('find.one.workout', { id })
      )
      return response;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  //@UseGuards(AuthGuard)
  //@Roles(Role.ADMIN_ROLE,Role.USER_ROLE)
  @Get('find-by-id-exercise-in-workout/:id')
  async findExerciseInWorkoutById(@Param('id', ParseIntPipe) id: number) {
    try {
      const response = await firstValueFrom(
        this.client.send('find.one.exercise.in.workout', { id })
      )
      return response;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE)
  @Patch('update/:id')
  async updateWorkout(@Param('id', ParseIntPipe) id: number, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    try {
      const response = await firstValueFrom(
        this.client.send('update.workout', { id, updateWorkoutDto })
      )
      return response;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE)
  @Delete('delete/:id')
  async removeWorkout(@Param('id', ParseIntPipe) id: number) {
    try {
      const response = await firstValueFrom(
        this.client.send('remove.workout', { id })
      )
      return response;
    } catch (error) {
      throw new RpcException(error)
    }
  }
}