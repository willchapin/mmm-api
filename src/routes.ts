import { getAllUsers, getUserById, createUser, updateUser } from './controller/UserAction';
import { getAllTags, createTag } from './controller/TagAction';

export const routes = [
    {
        path: '/users',
        method: 'get',
        action: getAllUsers 
    },
    {
        path: '/user/:id',
        method: 'get',
        action: getUserById 
    },
    {
        path: '/user',
        method: 'post',
        action: createUser 
    },
    {
        path: '/user',
        method: 'put',
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
        action: createTag 
    },
    //{
    //    path: '/purchace',
    //    method: 'get',
    //    action: getAllPurchaces
    //},
    //{
    //    path: '/tag',
    //    method: 'post',
    //    action: createTag 
    //}
];