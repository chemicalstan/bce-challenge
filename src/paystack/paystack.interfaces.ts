import { Field, ObjectType } from '@nestjs/graphql';

export class ResolveAccountInput {
  account_number: string;
  bank_code: string;
}

export class ResolveAccountResponse {
  account_number: string;
  account_name: string;
  bank_id: number;
}

@ObjectType()
export class BankDetail {
  @Field(() => String)
  code: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  slug: string;

  @Field(() => String)
  country: string;
}
