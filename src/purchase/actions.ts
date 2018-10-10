import { getConnection, getRepository, getManager } from 'typeorm';

import { Purchase } from './entity';
import { Tag } from '../tag/entity';

export async function getAllPurchases(ctx) {
  ctx.body = await getRepository(Purchase).find({ where: { user: ctx.user }});
};

export async function createPurchase(ctx) {

  const tags = await getRepository(Tag).findByIds(ctx.request.body.tagIds);

  const purchase = new Purchase();
  purchase.cost = ctx.request.body.cost;
  purchase.description = ctx.request.body.description;
  purchase.tags = tags;
  purchase.user = ctx.user;

  ctx.body = await getRepository(Purchase).save(purchase);
};

export async function updatePurchase(ctx) {
  const purchase = new Purchase();
  //tag.name = ctx.request.body.name;
  ctx.body = await getRepository(Purchase).save(purchase);
};
