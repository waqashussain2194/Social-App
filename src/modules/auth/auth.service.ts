import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AccountCreateInput } from './dto/account-create.input';
import * as bcrypt from 'bcrypt';
import { AccountLoginInput } from './dto/login-user.input';
import { UserExistsException } from 'src/utils/graphql-exceptions';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmailOrHandle(email)

    // Compare the password
    const valid = await bcrypt.compare(password, user.password)

    if (user && valid) {
      const { password, ...result } = user
      return result
    }

    return null
  }

  async login(input: AccountLoginInput) {
    const user = await this.userService.findByEmailOrHandle(input.email)

    if (!user) {
      throw new NotFoundException(`User Not Found.`);
    }

    // Compare the password
    const valid = await bcrypt.compare(input.password, user.password)

    if (user && valid) {
      const { password, ...result } = user
      console.log(user, 'user token')
      return {
        accessToken: this.jwtService.sign({
          username: user.email,
          sub: user.id
        }),
        user: user
      }
    }

    throw new NotFoundException(`User Not Found.`);
  }

  async signup(signupInput: AccountCreateInput) {
    let user = await this.userService.findByEmailOrHandle(signupInput.email, signupInput.handle)

    if (user) {
      throw new UserExistsException(`User Already Exists.`)
    }
    const password = await bcrypt.hash(signupInput.password, 10)

    user = await this.userService.create({
      ...signupInput,
      password
    })

    return {
      accessToken: this.jwtService.sign({
        username: user.email,
        sub: user.id
      }),
      user: user
    }
  }
}
