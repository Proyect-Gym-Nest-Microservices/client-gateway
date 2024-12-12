import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PaginationDto, Role } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { UpdateNutritionDto } from './dto/update-nutrition.dto';
import { CreateNutritionDto } from './dto/create-nutrition.dto';
import { ListNutritionIdsDto } from './dto/list-nutrition-ids.dto';

@Controller('nutrition')
export class NutritionController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE)
  @Post('create')
  async createNutritionPlan(@Body() createNutritionDto: CreateNutritionDto) {
    try {
      const nutritionPlan = await firstValueFrom(
        this.client.send('createNutrition', createNutritionDto)
      )
      return nutritionPlan;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE, Role.USER_ROLE)
  @Get('find-all')
  async findAllNutritionPlans(@Query() paginationDto: PaginationDto) {
    try {
      const nutritionPlans = await firstValueFrom(
        this.client.send('find.all.nutrition.plans', paginationDto)
      )
      return nutritionPlans;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE, Role.USER_ROLE)
  @Get('find-by-id/:id')
  async findNutritionPlanById(@Param('id') id: string) {
    try {
      const response = await firstValueFrom(
        this.client.send('find.one.nutrition.plan', { id })
      )
      return response;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE)
  @Patch('update/:id')
  async updateNutritionPlan(
    @Param('id') id: string,
    @Body() updateNutritionDto: UpdateNutritionDto
  ) {
    try {
      const response = await firstValueFrom(
        this.client.send('update.nutrition.plan', { id, updateNutritionDto })
      )
      return response;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE)
  @Delete('delete/:id')
  async removeNutritionPlan(@Param('id') id: string) {
    try {
      const response = await firstValueFrom(
        this.client.send('remove.nutrition.plan', { id })
      )
      return response;
    } catch (error) {
      throw new RpcException(error)
    }
  }

}