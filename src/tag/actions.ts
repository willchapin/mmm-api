import { getRepository } from 'typeorm';

import { Tag } from './entity';
import { validateCreateTag } from './validators';
import { Context } from 'koa';

export async function getAllTags(ctx: Context) {
  ctx.body = await getRepository(Tag).find();
}

export async function createTag(ctx: Context) {
  const body = ctx.request.body;
  if (!validateCreateTag(body, ctx)) {
    return;
  }

  const name = body.name.toLowerCase();

  const existingTag = await getRepository(Tag).findOne({ where: { name } });
  if (existingTag) {
    ctx.status = 409;
    ctx.body = {
      error: {
        message: `A Tag with name "${name}" already exists.`,
      }
    };
    return;
  }

  const tag = new Tag();
  tag.name = name;
  ctx.body = await getRepository(Tag).save(tag);
}
