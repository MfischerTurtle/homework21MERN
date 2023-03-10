const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Auth{
    token:String
    user:User
}
type User{
    _id:ID
    username:String!
    email:String!
    bookCount:Int
    savedBooks:[Book]
}
type Book{
    authors:[String]
    description:String!
    bookId:String!
    image:String
    link:String
    title:String!

}
input inputBook{
    authors:[String]
    description:String!
    bookId:String!
    image:String
    link:String
    title:String!

}
type Query{
    getSingleUser(username:String):User
    me:User
}
type Mutation{
    createUser(username:String!,email:String!,password:String!):Auth
    login(email: String!, password: String!):Auth
    saveBook(savedBook:inputBook):User
    removeBook(bookId:String!):User
}
`
module.exports=typeDefs