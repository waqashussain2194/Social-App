import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/comment.input';
import { GatewayService } from '../webSockets/webSocket.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private gatewayService: GatewayService,
  ) {}

  async createComment(
    createCommentInput: CreateCommentInput,
  ): Promise<Comment> {
    const { text, postId, userId } = createCommentInput;
    const comment = this.commentRepository.create({
      text,
      post: { id: postId },
      user: { id: userId },
    });
    this.gatewayService.notifyNewComment(comment);
    const savedComment = await this.commentRepository.save(comment);
    console.log('Saved Comment:', savedComment);
    return comment;
  }

  async getCommentsByPost(postId: number): Promise<Comment[]> {
    const comments = await this.commentRepository.find({
      where: { post: { id: postId } },
      relations: ['user', 'post'],
    });
    console.log('Fetched Comments:', comments);
    return comments;
  }
}
