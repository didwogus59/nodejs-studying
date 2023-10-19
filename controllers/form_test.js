const form_get = async (req, res) => {
    const {title, data} = req.body

    if(!title|| !data) {
        throw new badRequest("please data",400);
    }

    res.status(200).json({msg:'user reated',token});
}

const form_post = async (req, res) => {
    
}

module.exports = {
    form_get,
    form_post,
}
