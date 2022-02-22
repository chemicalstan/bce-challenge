import { Injectable } from '@nestjs/common';
import { PaystackService } from '../paystack/paystack.service';
import { CreateUserDto, QueryUserInput, VerifyUserInput } from './user.inputs';
import * as LD from 'fast-levenshtein';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private paystackService: PaystackService,
  ) {}

  private async create(data: CreateUserDto) {
    //** Prevent duplication */
    const user = await this.findOne({ ...data, is_verified: true });
    if (!user) return this.userModel.create(data);
    return user;
  }

  public findOne(data: QueryUserInput) {
    return this.userModel.findOne(data);
  }

  public async validateAccountName({
    user_account_number,
    user_bank_code,
    user_account_name,
  }: VerifyUserInput) {
    const result = await this.paystackService.resolveAccountNumber({
      account_number: user_account_number,
      bank_code: user_bank_code,
    });
    const payload: User = {
      account_name: user_account_name,
      account_number: user_account_number,
      bank_code: user_bank_code,
    };
    const distance = LD.get(
      user_account_name,
      result.account_name.toLowerCase(),
    );
    if (distance <= 2) {
      payload.is_verified = true;
      return this.create(payload);
    }
    return payload;
  }
}
