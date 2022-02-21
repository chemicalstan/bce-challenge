import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import config from 'src/config';
import { HttpMethod, HTTP_METHOD } from 'src/interfaces';
import { ResolveAccountDto } from './paystack.dto';

@Injectable()
export class PaystackService {
  constructor(private httpService: HttpService) {}

  private option(method: HttpMethod, path: string, data = {}) {
    return {
      port: 443,
      url: `${config.paystack.url}${path}`,
      method,
      data,
    };
  }

  public async resolveAccountNumber(data: ResolveAccountDto) {
    const option = this.option(
      HTTP_METHOD.GET,
      `/bank/resolve?account_number=${data.accountNumber}&bank_code=${data.bankCode}`,
    );
    const res = await this.httpService.request(option).toPromise();
    return res.data.data;
  }
}
