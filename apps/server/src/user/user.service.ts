import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { PasswordUtils } from 'src/utils/password.util';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly passwordUtils: PasswordUtils,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existedUser = await this.prismaService.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    if (existedUser) {
      throw new BadRequestException('User is existed');
    }
    const hashedPassword = await this.passwordUtils.hashPassword(
      createUserDto.password,
    );
    const user = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
    delete user.password;
    return user;
  }

  async findOneById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    delete user.password;
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    delete user.password;
    return user;
  }

  async verifyUserPassword(email: string, password: string): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User is not existed');
    }

    const comparedPassword = await this.passwordUtils.comparePasswords(
      password,
      user.password,
    );

    if (!comparedPassword) {
      throw new BadRequestException('Password is not correct');
    }
    delete user.password;
    return user;
  }
}
