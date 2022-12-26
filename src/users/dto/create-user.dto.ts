import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Email do usuario' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Nome completo do usuario' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Define o papel do usuário',
    default: false,
  })
  @IsNumber()
  roleId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Senha de acesso' })
  password: string;
}
