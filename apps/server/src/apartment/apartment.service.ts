import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '@prisma/client';
import { ApartmentsSearchQueries } from './dto/get-all-apartments.dto';

@Injectable()
export class ApartmentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    user: Omit<User, 'password'>,
    createApartmentDto: CreateApartmentDto,
  ) {
    const newApartment = await this.prismaService.apartment.create({
      data: {
        ...createApartmentDto,
        realtorId: user.id,
      },
    });
    return newApartment;
  }

  async findAll(apartmentsSearchQueries: ApartmentsSearchQueries) {
    const apartments = await this.prismaService.apartment.findMany({
      where: {
        ...(apartmentsSearchQueries.keyword
          ? {
              title: {
                contains: apartmentsSearchQueries.keyword,
                mode: 'insensitive',
              },
            }
          : {}),
        ...(apartmentsSearchQueries.minPrice || apartmentsSearchQueries.maxPrice
          ? {
              price: {
                ...(apartmentsSearchQueries.minPrice
                  ? { gte: Number(apartmentsSearchQueries.minPrice) }
                  : {}),
                ...(apartmentsSearchQueries.maxPrice
                  ? { lte: Number(apartmentsSearchQueries.maxPrice) }
                  : {}),
              },
            }
          : {}),
        ...(apartmentsSearchQueries.minSize || apartmentsSearchQueries.maxSize
          ? {
              areaSize: {
                ...(apartmentsSearchQueries.minSize
                  ? { gte: Number(apartmentsSearchQueries.minSize) }
                  : {}),
                ...(apartmentsSearchQueries.maxSize
                  ? { lte: Number(apartmentsSearchQueries.maxSize) }
                  : {}),
              },
            }
          : {}),
      },
    });
    return apartments;
  }

  async findMyAll(userId: string) {
    const apartments = await this.prismaService.apartment.findMany({
      where: {
        realtorId: userId,
      },
    });
    return apartments;
  }

  async findOne(id: string) {
    const apartment = await this.prismaService.apartment.findUnique({
      where: {
        id,
      },
    });
    if (!apartment) {
      throw new NotFoundException('Apartment does not exist');
    }
    return apartment;
  }

  async update(
    user: Omit<User, 'password'>,
    id: string,
    updateApartmentDto: UpdateApartmentDto,
  ) {
    const existedApartment = await this.prismaService.apartment.findUnique({
      where: {
        id,
        realtorId: user.id,
      },
    });
    if (!existedApartment) {
      throw new NotFoundException('Apartment does not exist');
    }
    const newApartment = await this.prismaService.apartment.update({
      where: {
        id,
        realtorId: user.id,
      },
      data: {
        ...updateApartmentDto,
      },
    });
    return newApartment;
  }

  remove(id: string) {
    return this.prismaService.apartment.delete({ where: { id } });
  }

  async addToFavorite(userId: string, apartmentId: string) {
    return await this.prismaService.userFavoriteApartment.create({
      data: {
        userId,
        apartmentId,
      },
    });
  }

  async removeFromFavorite(userId: string, apartmentId: string) {
    return await this.prismaService.userFavoriteApartment.deleteMany({
      where: {
        apartmentId,
        userId,
      },
    });
  }

  async findFavorite(userId: string) {
    const apartments = await this.prismaService.apartment.findMany({
      where: {
        userFavoriteApartment: {
          some: {
            userId,
          },
        },
      },
    });
    return apartments;
  }
}
