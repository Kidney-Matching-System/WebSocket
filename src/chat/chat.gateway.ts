/* eslint-disable prettier/prettier */
import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: { topic: string; message: any }): void {
    console.log(`Received message on topic: ${payload.topic}`, payload.message);
    
    // Broadcast message to all clients listening on the same topic
    this.server.emit(payload.topic, payload.message);
  }
}
