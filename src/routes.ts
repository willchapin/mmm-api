import { getAllUsers, getUserById, createUser, updateUser, getUserAuth } from './user/actions';
import { getAllPurchases, createPurchase } from './purchase/actions';
import { getAllTags, createTag } from './tag/actions';
import { login } from './session/actions';

import { byUser } from './middleware/authorization';

type Method = 'post' | 'get' | 'put' | 'delete' | 'options';

export interface Route {
    path: string;
    method: Method;
    action: Function;
    authorization?: Function;
}

export const routes: Route[] = [
    {
        path: '/login',
        method: 'post',
        action: login,
    },
    // don't make all users public
    //{
    //    path: '/users',
    //    method: 'get',
    //    action: getAllUsers
    //},
    {
        path: '/users/:userId/auth',
        method: 'get',
        action: getUserAuth,
        authorization: byUser,
    },
    {
        path: '/users',
        method: 'post',
        action: createUser 
    },
    {
        path: '/users/:userId',
        method: 'get',
        authorization: byUser,
        action: getUserById,
    },
    {
        path: '/users/:userId',
        method: 'put',
        authorization: byUser,
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
        authorization: byUser,
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
        action: createPurchase,
    }
];
