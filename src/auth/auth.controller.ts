import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';

import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { RegisterUserDto } from './dto/register-user.dto';
import { firstValueFrom } from 'rxjs';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) { 
    console.log({registerUserDto})
    try {
      const user = await firstValueFrom(
        this.client.send('auth.register.user',registerUserDto)
      )
      return user;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    try {
      const user = await firstValueFrom(
        this.client.send('auth.login.user', loginUserDto)
      )
      return user;
    } catch (error) {
      throw new RpcException(error)
    }
  }
  
}
