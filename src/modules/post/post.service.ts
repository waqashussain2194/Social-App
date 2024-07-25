import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/post.input';
import { User } from '../user/entities/user.entity';
import { GatewayService } from '../webSockets/webSocket.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private gatewayService: GatewayService,
  ) {}

  async create(
    createPostInput: CreatePostInput,
    userId: number,
  ): Promise<Post> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['posts'],
    });
    if (!user) {
      throw new Error('User not found');
    }

    const post = this.postRepository.create({ ...createPostInput, user });
    this.gatewayService.notifyNewPost(post);
    return this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({ where: { id }, relations: ['user'] });
  }
}
