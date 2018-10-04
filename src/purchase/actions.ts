import { getRepository, getManager } from 'typeorm';

import { Purchase } from './entity';
import { User } from '../user/entity';
import { Tag } from '../tag/entity';

export async function getAllPurchases(ctx) {
  ctx.body = await getRepository(Purchase).find();
};

export async function createPurchase(ctx) {
  // TODO: hook up createPurchase validator!
  const userId = ctx.request.body.userId;
  const user = await getRepository(User).findOne(userId);
  if (!user) {
    ctx.status = 400;
    ctx.body = {
      error: {
        message: `User with id ${userId} does not exist.`,
      }
    }
    return;
  }

  const tagIds = ctx.request.body.tagIds;
  const tags = await getRepository(Tag).findByIds(tagIds);
  ctx.body = tags;

  //ctx.body = await getRepository(User).findOne(4);

  //console.log(ctx.request.body);
  //const purchase = new Purchase();
  //tag.name = ctx.request.body.name;
  //ctx.body = await getRepository(Purchase).save(purchase);
};

export async function updatePurchase(ctx) {
  const purchase = new Purchase();
  //tag.name = ctx.request.body.name;
  ctx.body = await getRepository(Purchase).save(purchase);
};