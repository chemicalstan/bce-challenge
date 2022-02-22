import { Query, Resolver } from '@nestjs/graphql';
import { BankDetail } from './paystack/paystack.interfaces';
import { PaystackService } from './paystack/paystack.service';

@Resolver()
export class AppResolver {
  constructor(private paystackService: PaystackService) {}

  @Query(() => [BankDetail])
  async listBanks() {
    try {
      console.log('hahah');
      return await this.paystackService.listBanks();
    } catch (error) {
      throw error.message;
    }
  }
}
