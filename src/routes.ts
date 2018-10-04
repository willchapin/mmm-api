import { getAllUsers, getUserById, createUser, updateUser } from './user/actions';
import { validateGetUserById, validateCreateUser, validateUpdateUser } from './user/validators';

import { getAllTags, createTag } from './tag/actions';
import { validateCreateTag } from './tag/validators';

import { getAllPurchases, createPurchase, updatePurchase } from './purchase/actions';
import { validateCreatePurchase } from './purchase/validators';

import { login } from './session/actions';
import { validateLogin } from './session/validators';

export const routes = [
    {
        path: '/users',
        method: 'get',
        action: getAllUsers
    },
    {
        path: '/users/:userId',
        method: 'get',
        validation: validateGetUserById,
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
        path: '/users/:userId/purchases',
        method: 'get',
        action: getAllPurchases
    },
    {
        path: '/users/:userId/purchases',
        method: 'post',
        action: createPurchase,
        validation: validateCreatePurchase,
    },
    {
        path: '/users/:userId/purchase',
        method: 'put',
        action: updatePurchase 
    },
    {
        path: '/login',
        method: 'post',
        action: login,
        validation: validateLogin,
    }
];