/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PasswordService } from 'src/auth/password/password.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly passwordservice: PasswordService,
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
      pcpwd: await this.passwordservice.hashPassword(pcpwd),
    });

    return {
      msg: '注册成功',
      data: this.jwtService.sign({ id: user._Identify }),
    };
  }

  async login({ userid, pcpwd }) {
    // 查找用户是否注册过
    const foundUser = await this.userRepository.findOneBy({ userid });
    console.log(foundUser)
    if (!foundUser) {
      throw new BadRequestException('账号或密码错误！');
    }
    // 检查密码是否正确

    const isPasswordValid = await this.passwordservice.comparePasswords(pcpwd, foundUser.pcpwd)
    // this.secretTool.getSecret(pcpwd) === foundUser.pcpwd;
    if (!isPasswordValid) {
      throw new BadRequestException('账号或密码错误！');
    }

    return {
      data: this.jwtService.sign({ id: foundUser._Identify }),
      msg: '登录成功！',
    };
  }

  async find(_Identify: number) {
    const user = await this.userRepository.findOne({ where: { _Identify } });
    return { id: user._Identify, userid: user.userid, head_img: user.avatar };
  }
}
