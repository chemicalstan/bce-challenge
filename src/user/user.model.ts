import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => ID)
  _id?: string;

  @Field(() => String)
  @Prop({ type: String, required: true })
  account_name: string;

  @Field(() => String)
  @Prop({ type: String, required: true })
  account_number: string;

  @Field(() => String)
  @Prop({ type: String, required: true })
  bank_code: string;

  @Field(() => Boolean)
  @Prop({ type: Boolean, required: true, default: false })
  is_verified?: boolean;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
