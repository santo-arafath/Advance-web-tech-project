import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";


export class ExpertDTO {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    address: string;
    @IsNotEmpty()
    email:string;
    @IsNotEmpty()
    password: string;
}


export class VetDTO {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    address: string;
    @IsNotEmpty()
    email:string;
    @IsNotEmpty()
    password: string;
}


export class SolutiontDTO {
    @IsNotEmpty()
    title: string;
    description: string;
}