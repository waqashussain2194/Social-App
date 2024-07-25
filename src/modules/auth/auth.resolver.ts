import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth.response';
import { AccountCreateInput } from './dto/account-create.input';
import { AccountLoginInput } from './dto/login-user.input';
import {  ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  @ApiOperation({ summary: 'Login a user' })  // Add this line
  async accountLogin(@Args('input') input: AccountLoginInput) {
    const user = await this.authService.login(input);
    return user;
  }

  @Mutation(() => AuthResponse)
  @ApiOperation({ summary: 'Create a new account' })  // Add this line
  async accountCreate(
    @Args('input') input: AccountCreateInput,
  ): Promise<AuthResponse> {
    const res = await this.authService.signup(input);
    return res;
  }
}
