import { CanActivate, ExecutionContext, ForbiddenException, Inject, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Request } from "express";
import { firstValueFrom } from "rxjs";
import { NATS_SERVICE } from "src/config";
import { Reflector } from "@nestjs/core";



export class AuthGuard implements CanActivate {

    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy,
        private reflector:Reflector
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler())


        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('Token not found');
        }
        try {

            const {user, token:newToken}=await firstValueFrom(
                this.client.send('auth.verify.token',token)
            )

            request['user'] = user
            request['token'] = newToken;

            if (requiredRoles && requiredRoles.length > 0 ) {
                const hasRole = ()=> requiredRoles.some((role)=> user.roles?.includes(role))
                if (!user.roles  || !hasRole()) {
                    throw new ForbiddenException('Insufficient permissions');
                }
            }

        } catch(error) {
            if (error instanceof ForbiddenException) {
                throw error;
            }
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

}