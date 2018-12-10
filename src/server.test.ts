import { createTypeOrmConnection } from "./db-utils";
import { compareSync} from 'bcryptjs';
import * as Koa from 'koa';
import * as request from 'supertest';
import { getApp } from './server';

import { Connection } from 'typeorm';
import { Server } from "net";

let app: Koa;
let server: Server;
let connection: Connection;

describe("api", () => {
  beforeAll(async (done) => {
    connection = await createTypeOrmConnection();
    app = getApp();
    server = app.listen();
    done();
  });

  afterAll(() => {
    server.close();
    connection.close();
  });

  describe("user", () => {
    describe("post", () => {
      describe("with missing params", () => {
        test("should respond with 400", async (done) => {
          const response = await request(server) 
            .post('/users');

          expect(response.status).toEqual(400);
          done();
        });
      });

      describe("with invalid email", () => {
        test("should respond with 400", async (done) => {
          const response = await request(server) 
            .post('/users')
            .send({
              email: 'not a valid email',
              name: 'name',
              password: 'aA111111'
            });

          expect(response.status).toEqual(400);
          done();
        });
      });

      describe("with invalid password", () => {
        test("should respond with 400", async (done) => {
          const response = await request(server) 
            .post('/users')
            .send({
              email: 'a@a.a',
              name: 'name',
              password: 'not a valid password'
            });

          expect(response.status).toEqual(400);
          done();
        });
      });

      describe("with valid params", () => {
        const email = 'a@a.a';
        const name = 'name';
        const password = 'aA111111';

        let userId: number;
        let token: string;

        test("should respond with 200, and created user data", async (done) => {
          const response = await request(server) 
            .post('/users')
            .send({email, name, password});

          expect(response.status).toEqual(200);
          expect(response.body.id).toEqual(expect.any(Number));
          expect(response.body.email).toEqual(email);
          expect(response.body.name).toEqual(name);
          expect(compareSync(password, response.body.password)).toEqual(true);

          userId = response.body.id;

          done();
        });

        test("should be able to login to created user", async (done) => {
          const response = await request(server) 
            .post('/login')
            .send({email, password});

          expect(response.status).toEqual(200);
          expect(response.body.userId).toEqual(expect.any(Number));
          expect(response.body.token).toEqual(expect.any(String));

          token = response.body.token;

          done();
        });

        test("should be able to get user only when authorized", async (done) => {
          let response = await request(server) 
            .get(`/users/${userId}`);

          expect(response.status).toEqual(401); // unauthorized

          response = await request(server) 
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);

          expect(response.status).toEqual(200);
          expect(response.body.id).toEqual(expect.any(Number));
          expect(response.body.email).toEqual(email);
          expect(response.body.name).toEqual(name);

          done();
        });

        test("should be able to update user only when authorized", async (done) => {
          const newName = 'new name';
          let response = await request(server) 
            .put(`/users/${userId}`)
            .send({name: newName});

          expect(response.status).toEqual(401); // unauthorized

          response = await request(server) 
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);

          expect(response.body.name).toEqual(name); // name unchanged

          response = await request(server) 
            .put(`/users/${userId}`)
            .send({name: 'new name'})
            .set('Authorization', `Bearer ${token}`);

          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual(newName);

          done();
        });
      });
    });
  });
});

