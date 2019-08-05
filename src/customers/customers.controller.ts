import { Controller, Header, Param, Get, Post, Put, Body, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from '../common/entity/customer.entity';
import { Roles } from '../common/decorator/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AuthorisationGuard } from '../common/guard/authorisation.guard';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customerService: CustomersService) {}

    @Get()
    async findAll(): Promise<Customer[]> {
        return await this.customerService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/:id')
    async findCustomer(@Param('id') id): Promise<Customer> {
        return await this.customerService.findCustomer(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createCustomer(@Body() customer: CreateCustomerDto): Promise<Customer> {
        return await this.customerService.createCustomer(customer);
    }

    @UseGuards(AuthGuard('jwt'), AuthorisationGuard)
    @Put('/:id')
    @Roles('Customer', 'Photographer')
    async updateCustomer(@Param('id') id, @Body() customer: CreateCustomerDto): Promise<Customer> {
        return await this.customerService.updateCustomer(id, customer);
    }
}
