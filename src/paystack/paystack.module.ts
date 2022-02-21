import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PaystackService } from './paystack.service';
import config from 'src/config';

@Module({
  imports: [
    HttpModule.register({
      headers: { Authorization: `Bearer ${config.paystack.secret}` },
    }),
  ],
  providers: [PaystackService],
  exports: [PaystackService],
})
export class PaystackModule {}
