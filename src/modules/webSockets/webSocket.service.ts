import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Post } from '../post/entities/post.entity';
import { Comment } from '../comment/entities/comment.entity';

@WebSocketGateway({ cors: '*' })
export class GatewayService {
  @WebSocketServer()
  server: Server;
  notifyNewPost(requestData: Post) {
    this.server.emit('newPost', requestData);
  }
  notifyNewComment(requestData: Comment) {
    this.server.emit('newComment', requestData);
  }

}
