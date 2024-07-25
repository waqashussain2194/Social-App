import { Module } from '@nestjs/common';
import { GatewayService } from './webSocket.service';

@Module({
  providers: [GatewayService],
  exports:[GatewayService]
})
export class GatewayModule {}
