import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsDate } from 'class-validator';

export class ListUserDto {
  @ApiProperty({ description: 'Email do usuario' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Nome completo do usuario' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ description: 'Data de cadastro' })
  createdAt: Date;

  constructor(listUserDto ?: Partial<ListUserDto>) {
    this.email = listUserDto?.email
    this.name = listUserDto?.name
    this.createdAt = listUserDto?.createdAt
  }
}
