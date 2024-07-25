import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/comment.input';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Comment')
@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'Create a comment' })
  @ApiResponse({ status: 201, description: 'The comment has been successfully created.', type: Comment })
  @Mutation(() => Comment)
  async createComment(@Args('createCommentInput') createCommentInput: CreateCommentInput) {
    return this.commentService.createComment(createCommentInput);
  }

  @ApiOperation({ summary: 'Get comments by post ID' })
  @ApiResponse({ status: 200, description: 'Return comments for a specific post', type: [Comment] })
  @Query(() => [Comment])
  async comments(@Args('postId', { type: () => ID }) postId: number) {
    return this.commentService.getCommentsByPost(postId);
  }
}
