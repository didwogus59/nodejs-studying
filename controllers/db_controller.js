const Data = require('../models/data')

const db_get = async (req, res) => {
    const datas = await Data.find();
    return res.status(200).render('list',{"datas": datas});
}



const db_post = async (req, res) => {
    const title = req.body.title;
    const data = req.body.data;
    const newData = {"title":title, "data":data};
    await Data.create(newData);
    db_get(req, res)
}

const db_detail = async (req, res) => {
    const id = req.params.id;
    const data = await Data.findById({_id:id});
    return res.status(200).render('detail',{"data":data});
}

const db_delete = async (req, res) => {
    const id = req.params.id;
    await Data.findByIdAndDelete({_id:id});
    db_get(req, res)
}

const db_update = async(req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const data = req.body.data;
    await Data.findByIdAndUpdate({_id:id},{data:data, title:title});
    db_detail(req, res)
}
module.exports = {db_get, db_post, db_detail, db_delete, db_update};