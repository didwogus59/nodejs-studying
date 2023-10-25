const Users = require("../models/user");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken")
const signPage = (req, res) => {
    return res.status(200).render('sign',{"csrfToken":req.csrfToken()});
}

const loginPage = (req, res) => {
    return res.status(200).render('login',{"csrfToken":req.csrfToken()})
}

const signUser = async(req, res) => {
    const {name, password }= req.body
    const hashPassword = crypto.SHA256(password).toString();
    if(!password) {
        return res.status(200).json({"testing":"no password"});
    }
    const user = await Users.create({name:name, password:hashPassword});
    return signPage(req,res);
}

const loginUser = async(req, res) => {
    const user = await Users.findOne({name : req.body.name});
    const password = req.body.password;
    const hashPassword = crypto.SHA256(password).toString();
    console.log(user.password);
    console.log(hashPassword);
    if(user.password === hashPassword) {
        const token = jwt.sign({user},process.env.JWT_SECRET,{expiresIn: process.env.JWT_LIFETIME});
        return res.cookie("jwt",token).status(200).render('home');
    }
    return loginPage(req,res);
}

module.exports = {signUser, loginUser, signPage, loginPage};