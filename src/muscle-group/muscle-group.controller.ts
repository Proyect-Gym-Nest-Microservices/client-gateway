import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enum/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateMuscleGroupDto } from './dto/create-muscle-group.dto';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { UpdateMuscleGroupDto } from './dto/update-muscle-group.dto';

@Controller('muscle-group')
export class MuscleGroupController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE)
  @Post('create')
  async createMuscleGroup(@Body() createMuscleGroupDto: CreateMuscleGroupDto) {
    try {
      const muscleGroup = await firstValueFrom(
        this.client.send('create.muscle.group', createMuscleGroupDto)
      )
      return muscleGroup;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE,Role.USER_ROLE)
  @Get('find-all')
  async findAllMuscleGroup(@Query() paginationDto: PaginationDto) {
    try {
      const muscleGroups = await firstValueFrom(
        this.client.send('find.all.muscle.group', paginationDto)
      )
      return muscleGroups;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE,Role.USER_ROLE)
  @Get('find-by-id/:id')
  async findMuscleGroupById(@Param('id', ParseIntPipe) id: number) {
    try {
      const response = await firstValueFrom(
        this.client.send('find.one.muscle.group', { id })
      )
      return response;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE)
  @Patch('update/:id')
  async updateMuscleGroup(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMuscleGroupDto: UpdateMuscleGroupDto
  ) {
    try {
      const response = await firstValueFrom(
        this.client.send('update.muscle.group', { id, updateMuscleGroupDto })
      )
      return response;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE)
  @Delete('delete/:id')
  async removeMuscleGroup(@Param('id', ParseIntPipe) id: number) {
    try {
      const response = await firstValueFrom(
        this.client.send('remove.muscle.group', { id })
      )
      return response;
    } catch (error) {
      throw new RpcException(error)
    }
  }
}
