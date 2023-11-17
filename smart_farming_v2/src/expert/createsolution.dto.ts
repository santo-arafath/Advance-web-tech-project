import { IsNotEmpty } from "class-validator";

export class CreateSolutionDto{

    title: string;
    description: string;
    category: string;
    @IsNotEmpty ()
    expertId:number;
    
}