import { Body, Controller, Delete, Get, Inject, Patch, Query, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { UpdateUserDto } from './dto/update-user.dto';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enum/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE, Role.USER_ROLE)
  @Patch('update-user')
  async updateUser(@Body() updateUserDto:UpdateUserDto) {
    try {
      const response = await firstValueFrom(
        this.client.send('update.user',updateUserDto)
      )
      return response;
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
  @Roles(Role.ADMIN_ROLE)
  @Delete('delete-user')
  async deleteUser(@Body() id: string) {
    try {
      const response = await firstValueFrom(
        this.client.send('remove.user',id)
      )
      return response
    } catch (error) {
      throw new RpcException(error)
    }
  }


}
