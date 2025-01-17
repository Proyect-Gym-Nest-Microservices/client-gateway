import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PaginationDto } from 'src/common';
import { Role } from 'src/common/enums/roles.enum';
import { NATS_SERVICE } from 'src/config';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';


@Controller('exercise')
export class ExerciseController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE)
  @Post('create-exercise')
  async createExercise(@Body() createExerciseDto: CreateExerciseDto) {
    try {
      const exercise = await firstValueFrom(
        this.client.send('create.exercise', createExerciseDto)
      )
      return exercise;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE,Role.USER_ROLE)
  @Get('find-all-exercises')
  async findAllExercises(@Query() paginationDto: PaginationDto) {
    try {
      const exercises = await firstValueFrom(
        this.client.send('find.all.exercise', paginationDto)
      )
      return exercises;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE,Role.USER_ROLE)
  @Get('find-by-id/:id')
  async findExerciseById(@Param('id', ParseIntPipe) id: number) {
    try {
      const response = await firstValueFrom(
        this.client.send('find.exercise.by.id', { id })
      )
      return response

    } catch (error) {

      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE)
  @Patch('update-exercise/:id')
  async updateExercise(@Param('id', ParseIntPipe) id: number, @Body() updateExerciseDto: UpdateExerciseDto) {
    try {
      const response = await firstValueFrom(
        this.client.send('update.one.exercise', { id, updateExerciseDto })
      )
      return response

    } catch (error) {

      throw new RpcException(error)
    }
  }
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE)
  @Delete('delete-exercise/:id')
  async deleteExercise(@Param('id', ParseIntPipe) id: number) {
    try {
      const response = await firstValueFrom(
        this.client.send('remove.exercise', { id })
      )
      return response

    } catch (error) {
      throw new RpcException(error)
    }
  }


}
