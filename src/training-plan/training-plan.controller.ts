import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/common/enums/roles.enum';
import { NATS_SERVICE } from 'src/config';
import { CreateTrainingPlanDto } from './dto/create-training-plan.dto';
import { PaginationDto } from 'src/common';
import { UpdateTrainingPlanDto } from './dto/update-training-plan.dto';

@Controller('training-plan')
export class TrainingPlanController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE)
  @Post('create')
  async createTrainingPlan(@Body() createTrainingPlanDto: CreateTrainingPlanDto) {
    try {
      const trainingPlan = await firstValueFrom(
        this.client.send('create.training.plan', createTrainingPlanDto)
      )
      return trainingPlan;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE,Role.USER_ROLE)
  @Get('find-all')
  async findAllTrainingPlan(@Query() paginationDto: PaginationDto) {
    try {
      const trainingPlans = await firstValueFrom(
        this.client.send('find.all.training.plan', paginationDto)
      )
      return trainingPlans;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE,Role.USER_ROLE)
  @Get('find-by-id/:id')
  async findTrainingPlanById(@Param('id', ParseIntPipe) id: number) {
    try {
      const response = await firstValueFrom(
        this.client.send('find.training.plan.by.id', { id })
      )
      return response;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE)
  @Patch('update/:id')
  async updateTrainingPlan(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTrainingPlanDto: UpdateTrainingPlanDto
  ) {
    try {
      const response = await firstValueFrom(
        this.client.send('update.Training.plan', { id, updateTrainingPlanDto })
      )
      return response;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE)
  @Delete('delete/:id')
  async removeTrainingPlan(@Param('id', ParseIntPipe) id: number) {
    try {
      const response = await firstValueFrom(
        this.client.send('remove.training.plan', { id })
      )
      return response;
    } catch (error) {
      throw new RpcException(error)
    }
  }
}
