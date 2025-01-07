import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { createRatingDto } from './dto/create-rating.dto';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common';
import { User } from 'src/auth/decorators';

@Controller('rating')
export class RatingController {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN_ROLE, Role.USER_ROLE)
  @Post()
  async createRating(@User('id') id:string, @Body() createRatingDto: createRatingDto) {
    try {
      createRatingDto.userId = id;
      const response = await firstValueFrom(
        this.client.send('create.rating', createRatingDto)
      )
      return response;
    } catch (error) {
      throw new RpcException(error)
    }
  }

}
