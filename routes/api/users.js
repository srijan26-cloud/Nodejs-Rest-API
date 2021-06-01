const express = require('express')
const Router = express.Router();
const uuid = require('uuid')

let users = require("../../UsersData");

//Display all users
Router.get('/' , (req , res ) => {
    res.json(users)
})

//Display user by Id
Router.get('/:id' , (req, res ) => {
    const found = users.some((user) => user.id === parseInt(req.params.id));

    if(found)
        res.json(users.filter((user) => user.id === parseInt(req.params.id)))
    else
        res.sendStatus(400)
})

//Insert a user
Router.post('/' , (req ,res) => {
    const newUser = {
        id : uuid.v4(),
        name: req.body.name,
        email:req.body.email
    };

    if(!newUser.name || !newUser.email)
       res.sendStatus(400)

    else {
        users.push(newUser)
        res.json({message : "Inserted Successfully..", users})
    }
})

//Update a user by id
Router.put('/:id' , (req , res ) => {
    const found = users.some((user) => user.id === parseInt(req.params.id));

    if(found)
        {
            const userUpdate = req.body
            users.forEach(user => {
                if(user.id === parseInt(req.params.id))
                {
                    user.name = userUpdate.name ? userUpdate.name : user.name;
                    user.email = userUpdate.email ? userUpdate.email : user.email;
                    res.json({msg : "User Updated" , user});
                }
            });
        }
    else 
        res.sendStatus(400)
})

//Delete a user
Router.delete('/:id' , (req , res) => {
    const found = users.some((user) => user.id === parseInt(req.params.id));

    if(found){
        users = users.filter((user) => user.id !== parseInt(req.params.id))
        res.json({msg : "User Deleted" , users});
    }
    else 
        res.sendStatus(400)
})


module.exports = Router