/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PaystackModule } from './paystack/paystack.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          uri: config.get<string>('MONGO_URI'),
          autoCreate: true,
        };
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      formatError: (error) => {
        const graphQLFormattedError = {
          statusCode:
            // @ts-ignore
            error.extensions?.response?.statusCode || error.extensions?.code,
          message:
            // @ts-ignore
            error.extensions?.response?.message ||
            // @ts-ignore
            error.extensions?.exception?.response?.message ||
            error.message,
          timestamp: new Date().toISOString(),
          path: error.path,
        };
        return graphQLFormattedError;
      }, // This formats gql error response
      sortSchema: true,
      playground: true,
    }),
    PaystackModule,
    UserModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
