import User from '../models/user';

export async function getUserByToken(token) {
    const { _id } = token;

    try {
        var user = await User.findOne({ _id }, { password:0 }); //ищем пользователя по id, результат получаем без пароля
    } catch (e) {
        throw e        
    }
    
    return user
}


export async function getUserByName(login) {
   
    try {
        var user = await User.find({ login }, { password:0 }); //ищем пользователя по имени, результат получаем без пароля
    } catch (e) {
        throw e        
    }
    
    return user
}