import Page from '../models/page';
import User from '../models/user';

//создать запись
export async function create(req, res, next) {
    const pageData = req.body;
    const userId = req.token._id;

    pageData.userId = userId;

    try {
        var page = await Page.create(pageData);   
    } catch({ message }){
        return next ({
            status:400,
            message
        });
    }

    res.json(page)
}


//получить все записи
export async function getAll(req, res, next) {
    try {
        var pages = await Page.find({});
    } catch({ message }) {
        return next({
            status:500,
            message
        });

    }
    res.json({ pages })
}

export async function getPagesByUserLogin(req, res, next) {
    const { login } = req.params;
    try {
        var user = await User.findOne({ login });
    } catch({ message }) {
        return next({
            status:500,
            message
        });

    }

    if (!user) {
        return next({
            status:404,
            message: 'User not found'
        });
    }

    try {
        var pages = await Page.find({ userId: user._id });
    } catch({ message }) {
        return next({
            status:500,
            message
        });

    }

    res.json({ pages })
}

export async function deletePage(req, res, next) {
    const _id = req.params.id; //id записи (берется из параметров get)
    const userId = req.token._id;
    
    try {
        var pages = await Page.findOne({ _id });
    } catch({ message }) {
        return next({
            status:500,
            message
        });     
    }
    
    if(!pages) {
        return next({
            status:404,
            message:'Page not found'
        });
    }

    //если запись не плоьзователя
    if (userId.toString() !== pages.userId.toString()) {
        return next({
            status:403,
            message:'Premission denided'
        })
    }

    try {
        pages.remove();
    } catch({ message }) {
        return next({
            status:500,
            message
        });     
    }
    
    return res.json({ message: 'success' })

}