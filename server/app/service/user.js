'use strict';

const db = require('../data/database.json');
module.exports = app => {
    const users = db.users;

    class UserService extends app.Service {
        *verify({username, password}) {
            return users.some((user)=>{
                return user.username === username && user.password === password;
            });
        }

        * getUserInfo({username, password}) {
            return users.filter((user)=>{
                return user.username === username && user.password === password;
            })[0];
        }
    }
    return UserService;
};
