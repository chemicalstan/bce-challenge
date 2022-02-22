import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { User } from 'src/user/user.model';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const validUser: User = {
    account_name: 'Okonkwo Chukwebuka Stanley',
    account_number: '0229960656',
    bank_code: '058',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    jest.setTimeout(8000);
    await app.close();
  });

  afterAll(async () => {
    await app.close();
  });

  const gql = '/graphql';

  describe('verify user', () => {
    it('should verify user', async () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `mutation {verifyUser(payload: {user_bank_code: "058",user_account_name: "OKONKWO chukwebuka STANLEY",user_account_number: "0229960656"}){is_verified account_name account_number bank_code}}`,
        })
        .expect(200)
        .expect(({ body }) => {
          expect(body.data.verifyUser).toEqual({
            is_verified: true,
            account_name: 'OKONKWO chukwebuka STANLEY'.toLowerCase(),
            account_number: '0229960656',
            bank_code: '058',
          });
        });
    });

    it('should fail verification', async () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `mutation {verifyUser(payload: {user_bank_code: "058",user_account_name: "Chukuebuka Stanley Okonko",user_account_number: "0229960656"}){is_verified account_name account_number bank_code}}`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.errors).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                message: 'Account name validation failed',
              }),
            ]),
          );
        });
    });
  });

  describe('query user', () => {
    it("should return user's input", async () => {
      let verified_user;
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `mutation {verifyUser(payload: {user_bank_code: "058",user_account_name: "OKONKO chukwebuka STANLEY",user_account_number: "0229960656"}){is_verified account_name account_number bank_code}}`,
        })
        .expect(200)
        .expect(({ body }) => {
          verified_user = body.data.verifyUser;
        })
        .then(() => {
          request(app.getHttpServer())
            .post(gql)
            .send({
              query: `query{queryUser(payload:{account_number:"0229960656", bank_code:"058"})}`,
            })
            .expect(200)
            .expect(({ body }) => {
              expect(body.data.queryUser).toEqual(verified_user.account_name);
            });
        });
    });

    it('return paystacks data', async () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query: `query{queryUser(payload:{account_number:"0229960656", bank_code:"058"})}`,
        })
        .expect(200)
        .expect(({ body }) => {
          expect(body.data.queryUser).toEqual(validUser.account_name);
        });
    });
  });
});
