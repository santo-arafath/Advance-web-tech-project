// admin.dto.ts

import { IsString, IsNotEmpty, IsAlphanumeric, MinLength, IsEmail, IsInt, Min, IsNumber } from 'class-validator';

export class AdminInfoDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(4)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  
  age: number;

  
  filename: string;
}

export class UpdateAdminDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsInt()
  @Min(0)
  age: number;
}
