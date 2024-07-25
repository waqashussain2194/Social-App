import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PostService } from '../post/post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Post } from '../post/entities/post.entity';
import { GatewayService } from '../webSockets/webSocket.service';
import { GatewayModule } from '../webSockets/webSocket.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post]), GatewayModule],
  providers: [UserResolver, UserService, PostService, GatewayService],
  exports: [UserService],
})
export class UserModule {}
