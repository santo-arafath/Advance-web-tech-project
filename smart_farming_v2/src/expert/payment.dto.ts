import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class PaymentDto{

  @IsNumber({}, { message: 'Amount must be a valid number' })
  amount: number;

  @IsString({ message: 'Currency must be a string' })
  @IsNotEmpty({ message: 'Currency cannot be empty' })
  currency: string;

  @IsString({ message: 'Payment method must be a string' })
  @IsNotEmpty({ message: 'Payment method cannot be empty' })
  paymentMethod: string;
}