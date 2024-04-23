import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SecretTool } from '../utils/InternalTools';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly secretTool: SecretTool,
    private readonly jwtService: JwtService,
  ) { }
  async register({ userid, pcpwd }: RegisterUserDto) {
    // 查找用户是否注册过
    const foundUser = await this.userRepository.findOneBy({ userid });

    if (foundUser) {
      throw new BadRequestException('用户已存在！');
    }

    // 插入一条用户数据
    const user = await this.userRepository.save({
      userid,
      pcpwd: this.secretTool.getSecret(pcpwd),
    });

    return {
      msg: '注册成功',
      data: this.jwtService.sign({ id: user.Identify }),
    };
  }

  async login({ userid, pcpwd }) {
    // 查找用户是否注册过
    const foundUser = await this.userRepository.findOneBy({ userid });
    if (!foundUser) {
      throw new BadRequestException('账号或密码错误！');
    }
    // 检查密码是否正确
    const isPasswordValid =
      this.secretTool.getSecret(pcpwd) === foundUser.pcpwd;
    if (!isPasswordValid) {
      throw new BadRequestException('账号或密码错误！');
    }

    return {
      data: this.jwtService.sign({ id: foundUser.Identify }),
      msg: '登录成功！',
    };
  }

  async find(Identify: number) {
    const user = await this.userRepository.findOne({ where: { Identify } });
    return { id: user.Identify, userid: user.userid, head_img: user.avatar };
  }
}
