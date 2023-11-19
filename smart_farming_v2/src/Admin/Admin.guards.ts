import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
@Injectable()
export class SessionGuard implements CanActivate {
canActivate(
 context: ExecutionContext,
): boolean {
 const request = context.switchToHttp().getRequest();
return (request.session.username !== undefined,request.session.Adminid !== undefined);
 }
}