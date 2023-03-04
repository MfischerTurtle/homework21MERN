const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Auth{
    token:String
    user:User
}
type User{
    username:String!
    email:String!
    savedBooks:[Book]
}
type Book{
    authors:[String]
    description:String!
    bookId:String!
    image:String
    link:String!
    title:String!

}
input inputBook{
    authors:[String]
    description:String!
    bookId:String!
    image:String
    link:String!
    title:String!

}
type Query{
    getSingleUser(username:String):User
}
type Mutation{
    createUser(username:String!,email:String!,password:String!):Auth
    login(username:String,email:String):Auth
    saveBook(savedBook:inputBook):User
    deleteBook(bookId:String!):User
}
`
module.exports=typeDefs