import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PaginationDto, Role } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { firstValueFrom } from 'rxjs';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

@Controller('equipment')
export class EquipmentController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE)
  @Post('create')
  async createEquipment(@Body() createEquipmentDto: CreateEquipmentDto) {
    try {
      const equipment = await firstValueFrom(
        this.client.send('create.equipment', createEquipmentDto)
      )
      return equipment;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE, Role.USER_ROLE)
  @Get('find-all')
  async findAllEquipment(@Query() paginationDto: PaginationDto) {
    try {
      const equipment = await firstValueFrom(
        this.client.send('find.all.equipment', paginationDto)
      )
      return equipment;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE, Role.USER_ROLE)
  @Get('find-by-id/:id')
  async findEquipmentById(@Param('id', ParseIntPipe) id: number) {
    try {
      const response = await firstValueFrom(
        this.client.send('find.one.equipment', { id })
      )
      return response;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE)
  @Patch('update/:id')
  async updateEquipment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEquipmentDto: UpdateEquipmentDto
  ) {
    try {
      const response = await firstValueFrom(
        this.client.send('update.equipment', { id, updateEquipmentDto })
      )
      return response;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE)
  @Delete('delete/:id')
  async removeEquipment(@Param('id', ParseIntPipe) id: number) {
    try {
      const response = await firstValueFrom(
        this.client.send('remove.equipment', { id })
      )
      return response;
    } catch (error) {
      throw new RpcException(error)
    }
  }
}