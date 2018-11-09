import { getRepository } from 'typeorm';

import { Purchase } from './entity';
import { Tag } from '../tag/entity';
import { Context } from 'koa';
import { validateCreatePurchase } from './validators';

export async function getAllPurchases(ctx: Context) {
  ctx.body = await getRepository(Purchase).find({
    relations: ['tags'],
    where: { user: ctx.user },
    order: { timestamp: 'DESC'}
  });
}

export async function createPurchase(ctx: Context) {
  const body = ctx.request.body;
  if (!validateCreatePurchase(body, ctx)) {
    return;
  }

  const tagNames: string[] = body.tagNames;
  const tags = await Promise.all(tagNames.map(async (tagName): Promise<Tag> => {
    // get or create tags
    let tag = await getRepository(Tag).findOne({ where: { name: tagName } });
    if (!tag) {
      tag = new Tag();
      tag.name = tagName;
      tag = await getRepository(Tag).save(tag);
    }

    return tag;
  }));

  const purchase = new Purchase();
  purchase.cost = body.cost;
  purchase.description = body.description || '';
  purchase.tags = tags;
  purchase.user = ctx.user;

  ctx.body = await getRepository(Purchase).save(purchase);
}
