import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { User } from './user.model';

@InputType()
export class VerifyUserInput {
  @Field(() => String)
  @IsString()
  user_account_number: string;

  @Field(() => String)
  @IsString()
  user_bank_code: string;

  @Field(() => String)
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  user_account_name: string;
}

@InputType()
export class QueryUserInput {
  @Field(() => String)
  @IsString()
  account_number: User['account_number'];

  @Field(() => String)
  @IsString()
  bank_code: User['bank_code'];

  is_verified?: User['is_verified'];
}

export class CreateUserDto {
  account_number: User['account_number'];
  account_name: User['account_name'];
  bank_code: User['bank_code'];
  is_verified?: User['is_verified'];
}
