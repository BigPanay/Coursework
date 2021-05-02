import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { SessionSerializer } from './strategy/session.serializer';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
  providers: [
    AuthService, 
    SessionSerializer,
    JwtStrategy
],
  imports: [PassportModule,
    JwtModule.register({
      secret: "secret",
    //   secret: process.env.NODE_ENV == "production" ? process.env.SECRET_KEY : "secret",
      signOptions: {expiresIn: "6h"}
    })],
  exports: [AuthService]
})
export class AuthModule {}
