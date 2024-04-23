import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JwtModuleOptions } from '@nestjs/jwt';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mssql', // Change database type to 'mssql'
  host: '192.168.48.128', // Host, adjust if necessary
  port: 1433, // Default SQL Server port
  username: 'sa', // Typical default username for SQL Server
  password: 'Dmz081027', // Adjust password as necessary
  database: 'LtSystemManageDataSource', // Specify the database name
  entities: ['dist/**/*.entity{.ts,.js}'], // Entities path
  autoLoadEntities: true, // Auto-load entities
  options: {
    encrypt: true, // Required if connecting to SQL Server on Azure
    trustServerCertificate: true,
  },
};

// config.ts
export const jwtConfig: JwtModuleOptions = {
  secret: 'xdclass.net',
  signOptions: { expiresIn: '7d' },
  global: true,
};
