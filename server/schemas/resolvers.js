const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
Query:{
     getSingleUser: async function(parent,args,context ) {
        const foundUser = await User.findOne({
          $or: [{ _id: context.user._id }, { username: args.username }],
        });
    
        if (!foundUser) {
            throw new AuthenticationError('You need to be logged in!');
        }
    
        return foundUser;
      },

},
Mutation:{ 
     createUser:async function(parent, args ) {
        const user = await User.create(args);
    
        if (!user) {
            throw new AuthenticationError('You need to be logged in!');
        }
        const token = signToken(user);
        return {token, user} ;
      },
      // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
      // {body} is destructured req.body
       login:async function(parent, args) {
        const user = await User.findOne({ $or: [{ username: args.username }, { email: args.email }] });
        if (!user) {
            throw new AuthenticationError('You need to be logged in!');
        }
    
        const correctPw = await user.isCorrectPassword(args.password);
    
        if (!correctPw) {
          
        }
        const token = signToken(user);
        return{ token, user };
      },
      // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
      // user comes from `req.user` created in the auth middleware function
       saveBook:async function(parent,args,context ) {
        console.log(user);
        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: args.savedBook } },
            { new: true, runValidators: true }
          );
          return updatedUser;
        } catch (err) {
          console.log(err);
          throw new AuthenticationError('You need to be logged in!');
        }
      },
    
       deleteBook:async function(parent,args,context ) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: args.bookId } } },
          { new: true }
        );
        if (!updatedUser) {
            throw new AuthenticationError('You need to be logged in!');
        }
        return updatedUser;
      },
    }
    

}
module.exports=resolvers