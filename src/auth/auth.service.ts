import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../common/entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    // TODO Make sure a 404 is thrown when a user is not found not a 401

    if (!user) { return null; }

    const validPassword = await bcrypt.compare(pass, user.password);

    if (validPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {username: user.username, accountType: user.accountType , sub: user.id};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
