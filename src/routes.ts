import { getAllUsers, getUserById, createUser, updateUser } from './user/actions';
import { validateCreateUser, validateUpdateUser } from './user/validators';

import { getAllTags, createTag } from './tag/actions';
import { validateCreateTag } from './tag/validators';

import { getAllPurchases, createPurchase, updatePurchase } from './purchase/actions';
import { validateCreatePurchase } from './purchase/validators';

import { login } from './session/actions';
import { validateLogin } from './session/validators';

import { byUser } from './middleware/authorization';

export const routes = [
    {
        path: '/login',
        method: 'post',
        action: login,
        validation: validateLogin,
    },
    {
        path: '/users',
        method: 'get',
        action: getAllUsers
    },
    {
        path: '/users/:userId',
        method: 'get',
        authorization: byUser,
        action: getUserById,
    },
    {
        path: '/users',
        method: 'post',
        validation: validateCreateUser,
        action: createUser 
    },
    {
        path: '/users/:userId',
        method: 'put',
        authorization: byUser,
        validation: validateUpdateUser,
        action: updateUser 
    },
    {
        path: '/tags',
        method: 'get',
        action: getAllTags 
    },
    {
        path: '/tags',
        method: 'post',
        validation: validateCreateTag,
        action: createTag,
    },
    {
        path: '/users/:userId/purchases',
        method: 'get',
        authorization: byUser,
        action: getAllPurchases
    },
    {
        path: '/users/:userId/purchases',
        method: 'post',
        authorization: byUser,
        validation: validateCreatePurchase,
        action: createPurchase,
    },
    {
        path: '/users/:userId/purchase',
        method: 'put',
        authorization: byUser,
        action: updatePurchase 
    },
];