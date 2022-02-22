import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { HttpMethod, HTTP_METHOD } from '../interfaces';
import {
  BankDetail,
  ResolveAccountInput,
  ResolveAccountResponse,
} from './paystack.interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaystackService {
  constructor(
    private httpService: HttpService,
    private config: ConfigService,
  ) {}

  private option(method: HttpMethod, path: string, data = {}) {
    return {
      port: 443,
      url: `${this.config.get<string>('PAYSTACK_BASE_URL')}${path}`,
      method,
      data,
    };
  }

  public async resolveAccountNumber(
    data: ResolveAccountInput,
  ): Promise<ResolveAccountResponse> {
    const option = this.option(
      HTTP_METHOD.GET,
      `/bank/resolve?account_number=${data.account_number}&bank_code=${data.bank_code}`,
    );
    const res = await this.httpService.request(option).toPromise();
    return res.data.data;
  }

  public async listBanks(): Promise<BankDetail> {
    const res = await this.httpService
      .request(this.option(HTTP_METHOD.GET, '/bank?country=nigeria'))
      .toPromise();
    return res.data.data;
  }
}
