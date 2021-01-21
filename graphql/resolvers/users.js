const { UserInputError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const  { SECRET_KEY } = require('../../config');
const User = require('../../models/User');

module.exports = {
    Mutation: {
         async register(
            _,
            {
                registerInput: {username, email, password, confirmedPassword}
            },
        ){
            //TODO: Validate user data
            //TODO: Make sure user doesnt already exist
            const user = User.findOne({ username });
            if(user){
                throw new UserInputError('Username is taken',{
                    errors:{
                        username: 'This username is taken'
                    }
                });
            }
            //TODO: Hash the password and create token
            password = await bcrypt.hash(password, 12);

            const newUser =  new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
            }, SECRET_KEY, { expiresIn: '1h'});

            return{
                ...res._doc,
                id: res._id,
                token
            };
        }
    }
};