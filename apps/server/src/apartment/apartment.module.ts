import { Module } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { ApartmentController } from './apartment.controller';
import { DatabaseModule } from 'src/database/prisma.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ApartmentController],
  providers: [ApartmentService],
})
export class ApartmentModule {}
