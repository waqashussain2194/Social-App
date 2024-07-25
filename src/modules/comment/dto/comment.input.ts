import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {

  @Field()
  text: string;

  @Field(() => ID)
  postId: number;

  @Field(() => ID)
  userId: number;
}
