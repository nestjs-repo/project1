// import { Body, Controller, Get, Post, Res, Req } from '@nestjs/common';
// import { Response, Request } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //   @Get()
  //   findAll(@Req() req: Request, @Res() res: Response): Response {
  //     console.log(req.url);
  //     return res.send('return');
  //   }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  //   @Get(':id')
  //   findOne(@Param() param): string {
  //     return `Item: ${param.id}`;
  //   }

  @Get(':id')
  async findOne(@Param('id') id): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Post()
  async create(@Body() createUser: CreateUserDto): Promise<User> {
    return await this.userService.create(createUser);
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<User> {
    return await this.userService.delete(id);
  }

  @Put(':id')
  async update(
    @Body() updateUser: CreateUserDto,
    @Param('id') id,
  ): Promise<User> {
    return await this.userService.update(id, updateUser);
  }
}
