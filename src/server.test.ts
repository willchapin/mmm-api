import { createTypeOrmConnection } from "./db-utils";
import * as request from 'supertest';
import { getApp } from './server';

import { getRepository } from 'typeorm';
import { Tag } from './tag/entity';

let app;
let server;
let connection;

describe("routes: index", () => {
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

  test("should respond as expected", async (done) => {
    const response = await request(server)
      .get('/tags')
      .expect(res => {
        console.log(JSON.stringify(res));
      });

    expect(response.body[0]).toEqual({id: 1, name: 'food'});
    done();
  });
});

