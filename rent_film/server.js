const { ApolloServer } = require('apollo-server');
const { typeDefs, resolvers } = require('./schema');
const { SECRET } = require('./db'); // Import database
const jwt = require('jsonwebtoken')

url = 'http://localhost:4000';
const server = new ApolloServer({ 
    
    typeDefs, 
    resolvers, 
    context: async({req}) => {
        // Ottieni il token dalle intestazioni della richiesta
        let token = req.headers.authorization || ''; 
        try {
            const decoded  = jwt.verify(token, SECRET); //Decodifica del token
            return {
                customer_id: decoded.customer_id
            }
        } catch (e) {}
    } 
    
});

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`)
})