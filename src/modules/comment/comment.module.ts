import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { Comment } from './entities/comment.entity';
import { GatewayModule } from '../webSockets/webSocket.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]),GatewayModule],
  providers: [CommentService, CommentResolver],
})
export class CommentModule {}
