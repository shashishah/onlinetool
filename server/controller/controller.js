var Userdb= require('../model/model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//create and save new user
exports.create =(req,res)=>
{
    //validate request

    // if(req.body)
    // {
    //     res.status(400).send({message:"content can not  be empty"});
    //     return;
    // }

    //new user
    const user = new Userdb({

        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        status: req.body.status
    })

    
user
    .save(user)
    .then(data =>{

        res.send(data)
    })

    .catch(err=>{
        res.status(500).send({

            message:err.message || "some error ocured while creating a  create operation"
        });
    });

}
// retrive and reture all user
exports.find =(req,res)=>
{
    Userdb.find()
    .then(user=>{

        res.send(user)
    })

    .catch(err=>{
        res.status(500).send({
            message:err.message || "error occure while retriving user information"
        })
    })

    
}

//update and new identify

exports.update =(req,res)=>
{

    // if(req.body)
    // {
    //     return res
    //     .status(400)
    //     .send({message: "data to be update cant be empty"})
    // }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{userFindAndModify:false})
    .then(data=>{

        // if(data)
        // {
        //     res.status(404).send({message:'cant update user with $(id) may user not find'})
        // }

        // else{

            res.send(data)
        // }

    })

    .catch(err=>{
        res.status(500).send({message: 'error update as user information'})

    })

    
}

// delete the user
exports.delete =(req,res)=>
{

    const id= req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data=>
        {
            // if(data){
            //     res.status(404).send({message:'cant not delete with $(id), may be id is wrong'})
            // }

            // else{
                res.send({

                    message:'user was delete succesfully'
                })
            //}
        })

        .catch(err=>{

            res.status(500).send({
                message:"could not delete with id="+id
            });
        });

    
}


exports.login =(req,res,next)=>{

    var username = req.body.username
    var password = req.body.password

    Userdb.findOne({$or: [{email:username},{username:username}]})
    .then(Userdb => {

        if(Userdb)
        {

         if(password===Userdb.password){  

         
           
           
                let token = jwt.sign({name:Userdb.name},'verySecretvalue',{expiresIn:'1h'})
                

                res.json({

                    meassage: 'Login successfully',
                    token,
                    status:200
                })
           

            }  
            else{

                res.json({

                    message: 'password does not matched',
                    status:300
                })
                
            }

        
   
    
       


        } else
        
        {

            res.json({

                message :'no user find'
            })
        }
    
})
}

// module.exports = {

//    login
// }


