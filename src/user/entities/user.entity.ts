/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  _Identify: number;

  @Column({ type: 'nvarchar', length: 80 })
  userid: string;

  @Column({ type: 'nvarchar', length: 80 })
  name: string;

  @Column({ type: 'nvarchar', length: 16 })
  department: string;

  @Column({ type: 'nvarchar', length: 16 })
  position: string;

  @Column({ type: 'nvarchar', length: 80 })
  mobile: string;

  @Column({ type: 'nvarchar', length: 16 })
  gender: string;

  @Column({ type: 'nvarchar', length: 80 })
  email: string;

  @Column({ type: 'nvarchar', length: 80 })
  weixinid: string;

  @Column({ type: 'ntext' })
  avatar: string;

  @Column({ type: 'nvarchar', length: 16 })
  extattr: string;

  @Column({ type: 'bit' })
  permit: boolean;

  @Column({ type: 'nvarchar', length: 16 })
  openqqpassword: string;

  @Column({ type: 'bit' })
  admin: boolean;

  @Column({ type: 'nvarchar', length: 256 })
  pcpwd: string;

  @Column({ type: 'int' })
  deleted: number;

  @Column({ type: 'nvarchar', length: 'MAX' }) // 使用'MAX'作为nvarchar的特定长度
  address: string;

  @Column({ type: 'nvarchar', length: 10 })
  status: string;

  @Column({ type: 'int' })
  useraccountId: number;
}
