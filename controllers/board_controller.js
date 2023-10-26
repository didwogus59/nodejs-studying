const Data = require('../models/user_data')

const board_get = async (req, res) => {
    if(req.session.user) {
        var user = req.session.user;
    }
    if(req.user) {
        var user = req.user;
    }
    const datas = await Data.find();
    if(typeof user != "undefined")
        return res.status(200).render('board',{"datas": datas, "user": user});
    
    return res.status(200).render('board',{"datas": datas});
}



const board_post = async (req, res) => {
    const title = req.body.title;
    const data = req.body.data;
    console.log(req.user)
    if(req.session.user) {
        var {id, name} = req.session.user;
    }
    else if(req.user) {
        var {id, name} = req.user;
    }
    if(!id) {
        return res.status(200).redirect("/board");
    }

    const newData = {"title":title, "data":data, "user_id":id, "name":name};
        
    await Data.create(newData);

    return res.status(200).redirect("/board");
}

const board_detail = async (req, res) => {
    if(req.session.user) {
        var user = req.session.user;
    }
    if(req.user) {
        var user = req.user;
    }
    const id = req.params.id;
    const data = await Data.findById({_id:id});
    console.log(data);
    if(user)
        return res.status(200).render('board_detail',{"data":data, "user": user});
    
    return res.status(200).render('board_detail',{"data":data});
}

const board_delete = async (req, res) => {
    if(req.session.user) {
        var user = req.session.user;
    }
    if(req.user) {
        var user = req.user;
    }
    if(user) {
        const id = req.params.id;
        const title = req.body.title;
        const data = req.body.data;
        const user_data = await Data.findById({_id:id});
        if(user_data.user_id == user.id) {
            await Data.findByIdAndDelete({_id:id});
        }
    }
    res.status(200).redirect("/board");
}

const board_update = async(req, res) => {
    if(req.session.user) {
        var user = req.session.user;
    }
    if(req.user) {
        var user = req.user;
    }
    if(user) {
        const id = req.params.id;
        const title = req.body.title;
        const data = req.body.data;
        const user_data = await Data.findById({_id:id});
        if(user_data.user_id == user.id) {
            await Data.findByIdAndUpdate({_id:id},{data:data, title:title});
        }
    }
    res.status(200).redirect("/board");
}
module.exports = {board_get, board_post, board_detail, board_delete, board_update};