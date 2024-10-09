import { Controller, Get, Post, Body, Inject, UseGuards, Req, Res, UnauthorizedException, Patch } from '@nestjs/common';
import { envs, NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { RegisterUserDto } from './dto/register-user.dto';
import { catchError, firstValueFrom, timeout } from 'rxjs';
import { LoginUserDto } from './dto/login-user.dto';
import { CurrentUser } from './interfaces/current-user.interface';
import { Token, User } from './decorators';
import { AuthGuard } from './guards/auth.guard';
import { Request, Response } from 'express';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enum/roles.enum';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto, @Res({passthrough:true}) res: Response) {
    try {
      const user = await firstValueFrom(
        this.client.send('auth.register.user', registerUserDto)
      )
      const { accessToken, refreshToken } = user;
      
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure:process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
        path: '/api/auth/refresh', 
      });

      return { accessToken };

    } catch (error) {
      throw new RpcException(error);
    }

  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    try {
      const user = await firstValueFrom(
        this.client.send('auth.login.user', loginUserDto)
      )
      const { accessToken, refreshToken } = user;
      
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure:process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
        path: '/api/auth/refresh', 
      });

      return { accessToken };

    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Body() email:string) {
    try {
      const response = await firstValueFrom(
        this.client.send('auth.forgot.password',email)
      )
      return response
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE,Role.USER_ROLE)
  @Patch('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    try {
      const passwort = await firstValueFrom(
        this.client.send('auth.change.password', changePasswordDto)
      )
      return passwort;
    } catch (error) {
      throw new RpcException(error);
    }
  }


  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE,Role.USER_ROLE)
  @Get('verify')
  verifyToken(@User() user: CurrentUser, @Token() token: string) {
    //return this.client.send('auth.verify.token',{})
    return {
      user,
      token
    }
  }

  //@UseGuards(AuthGuard)
  //@Roles(Role.ADMIN_ROLE,Role.USER_ROLE)
  @Post('refresh')
  async refreshAccessToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }
    try {
      const tokens = await firstValueFrom(
        this.client.send('auth.refresh.access.token', refreshToken)
      )
      const { accessToken } = tokens;

      return { accessToken };
      
    } catch (error) {
      throw new RpcException(error)
    }

  }

}
