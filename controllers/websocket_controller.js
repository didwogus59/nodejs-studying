const test = (req, res) => {
    return res.status(200).render('web_socket_test');
}

const chatting = (req, res) => {
    return res.status(200).render('chatting');
}


const orderHandler = (io, socket) => {
    const connectUser = function () {
        console.log("new user");
    }

    const userJoin = function (name = "default") {
        console.log(`${name} join`);
    }
    
    const new_message = (message) => {
        username = "default";
        io.emit('chat', {"message": message, "username":username});
    }

    const testOrder = function (test) {
        console.log(test);
    }
    socket.on("connect",connectUser);
    socket.on("user_join",userJoin);
    socket.on("new_message", new_message);
    socket.on("test",testOrder);
}
module.exports = {
    orderHandler,
    test,
    chatting,
}
