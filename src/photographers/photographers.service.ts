import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Photographer } from '../common/entity/photographer.entity';
import { CreatePhotographerDto } from './dto/create-photographer.dto';
import { UpdatePhotographerDto } from './dto/update-photographer.dto';
import { mapping } from '../common/helper/mapping.helper';

@Injectable()
export class PhotographersService {
    constructor(@InjectRepository(Photographer) private readonly photographerRepository: Repository<Photographer>) {}

    getAll(): Promise<Photographer[]> {
        return this.photographerRepository.find();
    }

    async getPhotographer(id: number): Promise<Photographer> {
        const photographer = await this.photographerRepository.manager.findOne(Photographer, {id});
        if (photographer) { return photographer; }

        throw new HttpException('Photographer Does Not Exist', HttpStatus.NOT_FOUND);
    }

    createPhotographer(createPhotographerDto: CreatePhotographerDto): Promise<Photographer> {
        const newPhotographer = mapping(new Photographer(), createPhotographerDto);
        return this.photographerRepository.save(newPhotographer);
    }

    async updatePhotographer(id: number, updatePhotographerDto: UpdatePhotographerDto): Promise<Photographer> {
        const photographer = await this.photographerRepository.manager.findOne(Photographer, {id});
        if (photographer) {
            mapping(photographer, updatePhotographerDto);
            return this.photographerRepository.save(photographer);
        }

        throw new HttpException('Photographer Does Not Exist', HttpStatus.NOT_FOUND);
        return null;
    }
}
