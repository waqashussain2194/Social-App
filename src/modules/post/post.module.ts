import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { Post } from './entities/post.entity';
import { User } from '../user/entities/user.entity';
import { GatewayModule } from '../webSockets/webSocket.module';
import { GatewayService } from '../webSockets/webSocket.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User]), GatewayModule],
  providers: [PostService, PostResolver, GatewayService],
})
export class PostModule {}
