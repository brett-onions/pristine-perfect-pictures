import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { PhotographersController } from './photographers.controller';
import { PhotographersService } from './photographers.service';
import { Photographer } from '../common/entity/photographer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photographer])],
  controllers: [PhotographersController],
  providers: [PhotographersService],
})
export class PhotographersModule {}
