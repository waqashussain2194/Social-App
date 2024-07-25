import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreatePostInput {
  @ApiProperty({ example: 'A cool caption' })
  @Field()
  @IsString()
  caption: string;

  @ApiProperty({ example: 'http://example.com/image.png' })
  @Field()
  @IsUrl()
  imageUrl: string;
}
