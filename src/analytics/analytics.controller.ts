import { Body, Controller, Get, Inject, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { Period } from './enums/analytics.enum';
import { firstValueFrom } from 'rxjs';
import { UserStatsDto } from './dto/user-stats.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  //@UseGuards(AuthGuard)
  //@Roles(Role.ADMIN_ROLE)
  @Post('generate')
  async generateUserStatistics(
    @Body() userStatsDto: UserStatsDto
  ) {
    try {
      const statistics = await firstValueFrom(
        this.client.send('generate.user.statistics', userStatsDto)
      )
      return statistics;
    } catch (error) {
      throw new RpcException(error)
    }
  }

  //@UseGuards(AuthGuard)
  //@Roles(Role.ADMIN_ROLE, Role.USER_ROLE)
  @Get('get-statistics')
  async getStatistics(
    @Query('period') period: Period,
    @Query('date') date: Date
  ) {
    try {
      const statistics = await firstValueFrom(
        this.client.send('get.statistics', { period, date })
      )
      return statistics;
    } catch (error) {
      throw new RpcException(error)
    }
  }
}
