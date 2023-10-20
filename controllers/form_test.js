const form_get = async (req, res) => {
    return res.status(200).render('form_post',{"csrfToken":req.csrfToken()});
}

const form_post = async (req, res) => {
    return res.status(200).json({"title":req.body.title, "data":req.body.data});
}

module.exports = {
    form_get,
    form_post,
}
