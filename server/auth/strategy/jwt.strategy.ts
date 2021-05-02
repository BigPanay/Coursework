
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from '../../interfaces/IPayload';
import e, { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        if(request.signedCookies.usr != null) {
          return request.signedCookies.usr.access_token;
        } else {
          return null;
        }
      }]),
      ignoreExpiration: false,
      secretOrKey: process.env.NODE_ENV == "production" ? process.env.SECRET_KEY : "secret",
    });
  }

  async validate(payload: Payload) {
    return { userId: payload.sub, username: payload.username };
  }
}
