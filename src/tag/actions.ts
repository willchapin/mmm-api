import { getRepository, getManager } from 'typeorm';


import { Tag } from './entity';

export async function getAllTags(ctx) {
  ctx.body = await getRepository(Tag).find();
};

export async function createTag(ctx) {
  const name = ctx.request.body.name.toLowerCase();

  const existingTag = await getRepository(Tag).findOne({ where: { name } });
  if (existingTag) {
    ctx.status = 409;
    ctx.body = {
      error: {
        message: `A Tag with name "${name}" already exists.`,
      }
    }
    return;
  }

  const tag = new Tag();
  tag.name = name;
  ctx.body = await getRepository(Tag).save(tag);
};
