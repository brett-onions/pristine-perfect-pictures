import { Controller, Get, Post, Put, Body, Param, UsePipes } from '@nestjs/common';
import { CreatePhotographerDto } from './dto/create-photographer.dto';
import { UpdatePhotographerDto } from './dto/update-photographer.dto';
import { Photographer } from '../common/entity/photographer.entity';
import { PhotographersService } from './photographers.service';
import { JoiValidationPipe } from '../common/pipe/joi-validation.pipe';
import * as createSchema from '../common/schema/photographers/create-photographer.schema';
import * as updateSchema from '../common/schema/photographers/update-photographer.schema';

@Controller('photographers')
export class PhotographersController {

    constructor(private readonly photographerService: PhotographersService) {}

    @Get()
    async findAll(): Promise<Photographer[]> {
        return await this.photographerService.getAll();
    }

    @Get('/:id')
    async findPhotographer(@Param('id') id: number): Promise<Photographer> {
        return await this.photographerService.getPhotographer(id);
    }

    @Post()
    @UsePipes(new JoiValidationPipe(createSchema.default))
    async createPhotographer(@Body() createPhotographerDto: CreatePhotographerDto): Promise<Photographer> {
        return await this.photographerService.createPhotographer(createPhotographerDto);
    }

    @Put('/:id')
    async updateCustomer(@Param('id') id: number, @Body(new JoiValidationPipe(updateSchema.default)) updateCustomerDto: UpdatePhotographerDto)
    : Promise<Photographer> {
        return await this.photographerService.updatePhotographer(id, updateCustomerDto);
    }

}
