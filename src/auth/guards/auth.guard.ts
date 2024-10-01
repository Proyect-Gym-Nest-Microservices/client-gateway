import { CanActivate, ExecutionContext, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Request } from "express";
import { Observable } from "rxjs";
import { NATS_SERVICE } from "src/config";


export class AuthGuard implements CanActivate{
    
    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy
    ){}

    canActivate(context: ExecutionContext): Promise<boolean>  {
        const request = context.switchToHttp().getRequest();
        
        throw new Error("Method not implemented.");
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

}