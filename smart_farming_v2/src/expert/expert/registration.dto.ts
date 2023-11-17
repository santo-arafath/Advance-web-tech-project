import { Length, Matches } from 'class-validator';

export class RegistrationDto {

  name:string;
  @Length(1, 12, { message: 'Username length must be between 1 and 12 characters' })
  @Matches(/^[A-Za-z]+$/, { message: 'Username must consist of alphabet characters only' })
    username: string;
    
    @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 
      { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' })
    password: string;
    address:string;
    filename: string;
    email:string;
    uprofilePId:number;
    
  }