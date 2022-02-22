import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaystackModule } from '../paystack/paystack.module';
import { User, UserSchema } from './user.model';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PaystackModule,
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}
