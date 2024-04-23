import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtUtils {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  // 生成JWT
  generateToken(username: string): string {
    const expiresInSeconds = this.configService.get<number>('JWT_EXPIRE');
    const payload = { username };

    return this.jwtService.sign(payload, {
      expiresIn: `${expiresInSeconds}s`,
      secret: this.configService.get<string>('JWT_SECRET')
    });
  }

  // 解析JWT
  getClaimsByToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET')
      });
    } catch (e) {
      return null;
    }
  }

  // 判断JWT是否过期
  isTokenExpired(claims: any): boolean {
    return claims.exp * 1000 < new Date().getTime();
  }
}
