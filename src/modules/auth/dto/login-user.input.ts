import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AccountLoginInput {
  @Field()
  email: string

  @Field()
  password: string
}
