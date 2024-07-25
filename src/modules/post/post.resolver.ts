import { Resolver, Mutation, Args, Int, Query, ResolveField, Parent } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from '../post/dto/post.input';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

ApiTags('Post')
@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
  ) {}

  @ApiOperation({ summary: 'Create a post' })
  @ApiResponse({ status: 201, description: 'The post has been successfully created.', type: Post })
  @Mutation(() => Post)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return this.postService.create(createPostInput, userId);
  }

  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'Return all posts', type: [Post] })
  @Query(() => [Post])
  async getPosts(): Promise<Post[]> {
    return this.postService.findAll();
  }
}
