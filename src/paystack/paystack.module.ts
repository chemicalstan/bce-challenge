import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PaystackService } from './paystack.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          headers: {
            Authorization: `Bearer ${config.get<string>('PAYSTACK_SECRET')}`,
          },
        };
      },
    }),
  ],
  providers: [PaystackService],
  exports: [PaystackService],
})
export class PaystackModule {}
