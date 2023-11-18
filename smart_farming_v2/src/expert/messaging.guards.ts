import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class MessagingGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const senderId = +request.params.senderId; 
    const receiverId = +request.params.receiverId; 

   
    return Number.isInteger(senderId) && senderId > 0 &&
           Number.isInteger(receiverId) && receiverId > 0;
  }
}