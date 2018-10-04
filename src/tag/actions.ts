import { getRepository, getManager } from 'typeorm';


import { Tag } from './entity';

export async function getAllTags(ctx) {
  ctx.body = await getRepository(Tag).find();
};

export async function createTag(ctx) {
  const tag = new Tag();
  tag.name = ctx.request.body.name;
  ctx.body = await getRepository(Tag).save(tag);
};