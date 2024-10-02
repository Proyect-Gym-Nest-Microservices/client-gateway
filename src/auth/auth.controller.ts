import { Controller, Get, Post, Body, Inject, UseGuards } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { RegisterUserDto } from './dto/register-user.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { LoginUserDto } from './dto/login-user.dto';
import { CurrentUser } from './interfaces/current-user.interface';
import { Token, User } from './decorators';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('auth.register.user', registerUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error)
      })
    )

  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.login.user', loginUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      })
    )
  }


  @UseGuards(AuthGuard)
  @Get('verify')
  verifyToken(@User() user: CurrentUser, @Token() token: string) {
    //return this.client.send('auth.verify.token',{})
    return {
      user,
      token
    }
  }

}
