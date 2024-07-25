import { IsEmail, Length } from 'class-validator';
import { AccountCreateInput } from '../../auth/dto/account-create.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(AccountCreateInput) {
  @Field({ description: 'The full name of the user.' })
  fullName: string

  @Field({ description: 'The user email address.' })
  @IsEmail()
  email: string

  @Field({ description: 'The user handle.' })
  handle: string

  @Field({ description: 'The user password.' })
  @Length(6, 20)
  password: string
}
