import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';

@ObjectType({ description: 'Return type of accountCreate mutation' })
export class AccountCreateResponse {
  @Field({ description: 'The account that was created' })
  user: User;

  @Field({ description: 'The access token for the account' })
  accessToken: string;
}
