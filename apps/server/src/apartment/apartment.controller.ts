import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { ApartmentsSearchQueries } from './dto/get-all-apartments.dto';

@Controller({ path: 'apartment', version: '1' })
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: Request, @Body() createApartmentDto: CreateApartmentDto) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.apartmentService.create(user, createApartmentDto);
  }

  @Get()
  findAll(@Query() apartmentsSearchQueries: ApartmentsSearchQueries) {
    return this.apartmentService.findAll(apartmentsSearchQueries);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  findMyAll(@Req() req: Request) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.apartmentService.findMyAll(user.id);
  }

  @Get('/favorite')
  @UseGuards(JwtAuthGuard)
  findMyFavorite(@Req() req: Request) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.apartmentService.findFavorite(user.id);
  }

  @Post('/favorite/:id')
  @UseGuards(JwtAuthGuard)
  addToFavorite(@Req() req: Request, @Param('id') id: string) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.apartmentService.addToFavorite(user.id, id);
  }

  @Delete('/favorite/:id')
  @UseGuards(JwtAuthGuard)
  removeFromFavorite(@Req() req: Request, @Param('id') id: string) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.apartmentService.removeFromFavorite(user.id, id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apartmentService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateApartmentDto: UpdateApartmentDto,
  ) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.apartmentService.update(user, id, updateApartmentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.apartmentService.remove(id);
  }
}
