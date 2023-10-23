const form_get = (req, res) => {
    return res.status(200).render('form_post');
}

const form_post = (req, res) => {
    return res.status(200).json({"title":req.body.title, "data":req.body.data});
}

const form_get_csrf = (req, res) => {
    return res.status(200).render('form_post_csrf',{"csrfToken":req.csrfToken()});
}

const form_post_csrf = (req, res) => {
    return res.status(200).json({"title":req.body.title, "data":req.body.data});
}
module.exports = {
    form_get,
    form_post,
    form_get_csrf,
    form_post_csrf,
}
