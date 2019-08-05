import { Controller, Post, Patch, Body, UseGuards, Delete, Request, Param} from '@nestjs/common';
import { JoiValidationPipe } from '../common/pipe/joi-validation.pipe';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import * as createUserSchema from '../common/schema/users/create-user.schema';


@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    async createUser(@Body(new JoiValidationPipe(createUserSchema.default)) createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('/:id')
    async updatePassword(@Body() updatePasswordDto){
        return null;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    async deleteUser(@Request() req, @Param('id') id) {
        return null;
    }
}
