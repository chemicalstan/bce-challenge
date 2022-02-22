import { UsePipes } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ResolveAccountResponse } from '../paystack/paystack.interfaces';
import { PaystackService } from '../paystack/paystack.service';
import { StrictValidationPipe } from '../validation.pipes';
import { titleCase } from 'title-case';
import { QueryUserInput, VerifyUserInput } from './user.inputs';
import { User, UserDocument } from './user.model';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(
    private paystackService: PaystackService,
    private userService: UserService,
  ) {}

  @Query(() => String)
  @UsePipes(new StrictValidationPipe())
  async queryUser(@Args('payload') payload: QueryUserInput) {
    try {
      let user: UserDocument | ResolveAccountResponse =
        await this.userService.findOne(payload);
      if (!user)
        user = await this.paystackService.resolveAccountNumber(payload);
      return titleCase(user.account_name);
    } catch (error) {
      throw error.message;
    }
  }

  @Mutation(() => User)
  @UsePipes(new StrictValidationPipe())
  async verifyUser(@Args('payload') payload: VerifyUserInput): Promise<User> {
    try {
      return await this.userService.validateAccountName(payload);
    } catch (error) {
      throw error.message;
    }
  }
}
