import { Body, Controller, Delete, Get, Inject, Param, ParseArrayPipe, ParseUUIDPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { UpdateUserDto } from './dto/update-user.dto';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enum/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { MongoIdDto } from './dto/mongo-id.dto';

@Controller('user')
export class UserController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE, Role.USER_ROLE)
  @Patch('update-user/:id')
  async updateUser(@Param() params: MongoIdDto, @Body() updateUserDto: UpdateUserDto) {
    try {
      const response = await firstValueFrom(
        this.client.send('update.user', { id:params.id, updateUserDto })
      )
      return response;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE, Role.USER_ROLE)
  @Get('find-by-id/:id')
  async findUserById(@Param() params: MongoIdDto) {
    try {
      const response = await firstValueFrom(
        this.client.send('find.user.by.id', {id:params.id})
      )
      return response
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE)
  @Get('find-all-users')
  async findAll(@Query() paginationDto: PaginationDto) {
    try {
      const users = await firstValueFrom(
        this.client.send('find.all.users', paginationDto)
      )
      return users;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE, Role.USER_ROLE)
  @Get('find-training-plans/:id')
  async findTrainingPlanByIds(@Param() params: MongoIdDto) {
    try {
      const response = await firstValueFrom(
        this.client.send('get.user.training.plans', {id:params.id})
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE, Role.USER_ROLE)
  @Get('find-workouts/:id')
  async getUserWorkouts(@Param()params: MongoIdDto) {
    try {
      const response = await firstValueFrom(
        this.client.send('get.user.workouts', {id:params.id})
      );

      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE, Role.USER_ROLE)
  @Get('find-nutrition-plans/:id')
  async findNutritionPlanByIds(@Param() params: MongoIdDto) {
    try {
      const response = await firstValueFrom(
        this.client.send('get.user.nutritions', {id:params.id})
      );
      return response;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE)
  @Delete('delete-user/:id')
  async deleteUser(@Param() params: MongoIdDto) {
    try {
      const response = await firstValueFrom(
        this.client.send('remove.user', {id:params.id})
      )
      return response
    } catch (error) {
      throw new RpcException(error)
    }
  }


}
