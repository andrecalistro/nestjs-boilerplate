import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { ListUserDto } from './dto/list-user.dto';
import * as fs from 'fs';
import { HttpService } from '@nestjs/axios';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Roles } from '../auth/roles.decorator';
import { RoleGuard } from '../auth/role.guard';

@ApiTags('Users')
@Controller('api/v1/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly httpService: HttpService
  ) {}

  @Get()
  @Roles('administrator')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<ListUserDto[]> {
    return this.usersService.findAll();
  }

  @Get('download')
  @Roles('administrator', 'customer')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @HttpCode(HttpStatus.OK)
  public async download(): Promise<string> {
    return 'efetuar download'
    // const images = []

    // images.forEach(async function(image, index) {
    //   const writer = fs.createWriteStream(`dist/image-${index}.png`);

    //   const response = await this.httpService.axiosRef({
    //       url: image,
    //       method: 'GET',
    //       responseType: 'stream',
    //   });

    //   response.data.pipe(writer);
    // }, this)
  }
}
