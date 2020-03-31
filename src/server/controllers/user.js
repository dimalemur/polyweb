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

//обработчик, проверяющий пользователя в базе данных
export async function checkUserByName(req, res, next) {
    const name = req.params.user;   

    try {
        var userName = await UserServices.getUserByName(name); //получаем юзезра по имени
    } catch ({ message }) {
        return next({
            status:500,
            message
        });
    }    

    if (!userName[0]) {
        res.sendStatus(404)
    } else {
        next() // запускаем следующий обработчик
    }
}
