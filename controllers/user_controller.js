const Users = require("../models/user");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken")
const session = require('express-session')

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

const loginUser_jwt = async(req, res) => {
    if(req.cookies.jwt) {
        console.log("token exist");
        return loginPage(req,res);
    }

    const user = await Users.findOne({name : req.body.name});
    const password = req.body.password;
    const hashPassword = crypto.SHA256(password).toString();
    
    if(user.password === hashPassword) {
        const token = jwt.sign({id:user.id,name:user.name},process.env.JWT_SECRET,{expiresIn: process.env.JWT_LIFETIME});
        return res.cookie("jwt",token,{ maxAge: 3600000 }).status(200).redirect("/");
    }
    return loginPage(req,res);
}

const loginUser_session = async(req, res, next) => {
    if(req.session.user) {
        console.log("session exist");
        console.log(req.session.user)
        return loginPage(req,res);
    }
    const user = await Users.findOne({name : req.body.name});
    const password = req.body.password;
    const hashPassword = crypto.SHA256(password).toString();

    if(user.password === hashPassword) {
        req.session.user = {
            name: user.name,
            id: user._id,
        }
        return res.status(200).redirect("/");
    }
    return res.redirect("/user/session");
}

const logout_jwt = (req, res) => {
    res.clearCookie('jwt');
    return res.status(200).redirect("/");
}


const logout_session = (req, res) => {
    req.session.destroy();
    return res.status(200).redirect("/");
}
module.exports = {signUser, loginUser_jwt, loginUser_session, signPage, loginPage, logout_jwt, logout_session};

