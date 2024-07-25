import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class AccountCreateInput {
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
