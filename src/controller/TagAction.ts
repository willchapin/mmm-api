import { IRouterContext } from 'koa-router';
import { getRepository, getManager } from 'typeorm';


import { Tag } from '../entity/Tag';

export async function getAllTags(context) {
  context.body = await getRepository(Tag).find();
};

export async function createTag(context) {
  const tag = new Tag();
  tag.name = context.request.body.name;
  context.body = await getRepository(Tag).save(tag);
};