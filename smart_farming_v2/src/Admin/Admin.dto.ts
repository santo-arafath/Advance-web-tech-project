// admin.dto.ts

import { IsString, IsNotEmpty, IsAlphanumeric, MinLength, IsEmail, IsInt, Min, IsNumber,Matches } from 'class-validator';

export class AdminInfoDTO {
  @IsString()
  @IsNotEmpty({message: 'Please enter name box is empty'}) 
  name: string;

  @IsNotEmpty({message: 'Please enter a valid username'}) 
  @MinLength(5, { message: 'Username must be at least 5 characters ' })
  username: string;

  
  @IsNotEmpty()
  @Matches(/^(?=(?:[^A-Z]*[A-Z]){1})(?=(?:[^a-z]*[a-z]){2})[A-Za-z]{4}(?=.*[0-9!@#$%^&*])[0-9!@#$%^&*]+/, { message: 'Password must contain capital letter 1 special char  and numbers' })

  password: string;

  @IsNotEmpty({ message: 'Adress cannot be empty' })
  address: string;

  @IsEmail({ message: 'Invalid email' })
  @IsNotEmpty({message: 'Please enter email box is empty'})
  email: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  filename: string;
}


export class LoginDto {
  username: string;
  password: string;
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




