import { getRepository, getManager } from 'typeorm';

import { Purchase } from './entity';

export async function getAllPurchases(ctx) {
  ctx.body = await getRepository(Purchase).find();
};

export async function createPurchase(ctx) {
  // TODO: hook up createPurchase validator!
  const purchase = new Purchase();
  //tag.name = ctx.request.body.name;
  ctx.body = await getRepository(Purchase).save(purchase);
};

export async function updatePurchase(ctx) {
  const purchase = new Purchase();
  //tag.name = ctx.request.body.name;
  ctx.body = await getRepository(Purchase).save(purchase);
};