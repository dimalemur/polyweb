import * as UserServices from '../services/UserService';

export async function getCurrentUser(req, res, next) {
    const { token } = req;

    try {
        var user = await UserServices.getUserByToken(token); //получаем юзезра по id 
    } catch ({ message }) {
        return next({
            status:500,
            message
        });
    }

    return res.json(user);
}