import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class MessagingGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const senderId = +request.params.senderId; // Convert to number
    const receiverId = +request.params.receiverId; // Convert to number

    // Check if senderId and receiverId are valid (e.g., positive integers)
    return Number.isInteger(senderId) && senderId > 0 &&
           Number.isInteger(receiverId) && receiverId > 0;
  }
}