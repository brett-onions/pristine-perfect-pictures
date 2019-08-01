import { Controller, Header, Param, Get, Post, Put, Body } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from '../common/entity/customer.entity';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customerService: CustomersService) {}

    @Get()
    async findAll(): Promise<Customer[]> {
        return await this.customerService.findAll();
    }

    @Get('/:id')
    async findCustomer(@Param('id') id): Promise<Customer> {
        return await this.customerService.findCustomer(id);
    }

    @Post()
    async createCustomer(@Body() customer: CreateCustomerDto): Promise<Customer> {
        return await this.customerService.createCustomer(customer);
    }

    @Put('/:id')
    async updateCustomer(@Param('id') id, @Body() customer: CreateCustomerDto): Promise<Customer> {
        return await this.customerService.updateCustomer(id, customer);
    }
}
