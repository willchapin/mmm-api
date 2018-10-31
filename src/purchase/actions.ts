import { getConnection, getRepository, getManager } from 'typeorm';

import { Purchase } from './entity';
import { Tag } from '../tag/entity';

export async function getAllPurchases(ctx: any) {
  ctx.body = await getRepository(Purchase).find({
    relations: ['tags'],
    where: { user: ctx.user },
    order: { timestamp: 'DESC'}
  });
}

export async function createPurchase(ctx: any) {
  const tagNames: string[] = ctx.request.body.tagNames;
  const tags: any = await Promise.all(tagNames.map(async (tagName): Promise<Tag> => {
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
  purchase.cost = ctx.request.body.cost;
  purchase.description = ctx.request.body.description;
  purchase.tags = tags;
  purchase.user = ctx.user;

  ctx.body = await getRepository(Purchase).save(purchase);
}
