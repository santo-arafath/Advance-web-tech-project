import { Transform } from "class-transformer";
import { IsDateString, IsNotEmpty, IsString, Matches, MaxLength, MinLength, IsEmail, IsDate, IsPhoneNumber } from "class-validator";

export class FarmerDTO {
    @IsNotEmpty({ message: "First name should not be empty" })
    @IsString({ message: "First name must be a string" })
    @Matches(/^[A-Za-z.]+$/, {message: "First name must contain letters only " })
    firstName: string;

    @IsNotEmpty({ message: "Last name should not be empty " })
    @IsString({ message: "Last name must be a string " })
    @Matches(/^[A-Za-z.]+$/, {message: "Last name must contain letters only " })
    lastName: string;

    @IsNotEmpty({ message: " Username should not be empty " })
    @IsString({ message: " Username must be a string " })
    username: string;

    @IsNotEmpty({ message: " Date of birth should not be empty " })
    @IsDate({ message: " Date of birth should be a Date " })
    @Transform(({ value }) => new Date(value))
    dateOfBirth: Date;

    @IsNotEmpty({ message: " Address should not be empty " })
    @IsString({ message: "Address should not be empty " })
    address: string;

    @IsNotEmpty({ message: "Telephone Number should not be empty " })
    @MinLength(11)
    @MaxLength(11)
    @IsPhoneNumber('BD')
    telephoneNumber: string;

    @IsNotEmpty({ message: "Email should not be empty " })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: "Password should not be empty " })
    @MinLength(6)
    password: string;

    @IsNotEmpty({ message: "Confirm password should not be empty " })
    @MinLength(6)
    confirmPassword: string;

    profilePicture: string;
}

export class EditFarmerDTO {
    editKey: string;
    editValue: string;
}

export class userDTO {
    email: string;
    password: string;
}


export class RequestDTO {
   // @IsNotEmpty()
    farmerID: number;

    //@IsNotEmpty()
    requestCategory: string;

    //@IsNotEmpty()
    description: string;

    requestStatus: string

    assign: number;
   
}


