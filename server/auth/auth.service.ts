import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { Log } from '../common/utils/logging/Log';
import { Payload } from '../interfaces/IPayload';

@Injectable()
export class AuthService {
    public constructor(
        private jwtService: JwtService) { }

    async sign(user: User): Promise<any> {
        Log.server.debug("AuthService - sign -: " + JSON.stringify(user));
        const payload: Payload = { username: user.username, sub: user.id, 
            // userInfo: user.info.id,
        };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
