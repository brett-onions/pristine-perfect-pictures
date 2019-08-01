import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../common/entity/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { mapping } from '../common/helper/mapping.helper';

@Injectable()
export class CustomersService {

    constructor(@InjectRepository(Customer) private readonly customerRepository: Repository<Customer>) {}

    findCustomer(id: number): Promise<Customer> {
        return this.customerRepository.manager.findOne(Customer, {id});
    }

    findAll(): Promise<Customer[]> {
        return this.customerRepository.find();
    }

    createCustomer(customer: CreateCustomerDto): Promise<Customer> {
        const newCustomer =  mapping(new Customer(), customer);
        return this.customerRepository.save(newCustomer);
    }

    async updateCustomer(id: number, updateCustomerDto: CreateCustomerDto): Promise<Customer>{
        const updatedCustomer = await this.customerRepository.manager.findOne(Customer, {id});

        if (updatedCustomer) {
            mapping(updatedCustomer, updateCustomerDto);
            return this.customerRepository.save(updatedCustomer);
        }

        throw new HttpException('Customer Does Not Exist', HttpStatus.NOT_FOUND);
        return null;
    }
}
