import { getAllUsers, getUserById, createUser, updateUser } from './user/actions';
import { validateGetUserById, validateCreateUser, validateUpdateUser } from './user/validators';

import { getAllTags, createTag } from './tag/actions';
import { validateCreateTag } from './tag/validators';

import { getAllPurchases, createPurchase, updatePurchase } from './purchase/actions';
//import { validateGetPurchaseById, validateCreatePurchase, validateUpdatePurchase } from './user/validators';

export const routes = [
    {
        path: '/users',
        method: 'get',
        action: getAllUsers
    },
    {
        path: '/user/:id',
        method: 'get',
        validation: validateGetUserById,
        action: getUserById,
    },
    {
        path: '/user',
        method: 'post',
        validation: validateCreateUser,
        action: createUser 
    },
    {
        path: '/user',
        method: 'put',
        validation: validateUpdateUser,
        action: updateUser 
    },
    {
        path: '/tags',
        method: 'get',
        action: getAllTags 
    },
    {
        path: '/tag',
        method: 'post',
        action: createTag,
        validation: validateCreateTag,
    },
    {
        path: '/purchase',
        method: 'get',
        action: getAllPurchases
    },
    {
        path: '/purchase',
        method: 'post',
        action: createPurchase
    },
    {
        path: '/purchase',
        method: 'put',
        action: updatePurchase 
    }
];