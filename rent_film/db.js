/**  Sono stati usati due database:
 *    - db_rent: database https://www.postgresqltutorial.com/postgresql-getting-started/postgresql-sample-database/
 *    - db_user: database separato per gli utenti dell'applicazione 
*/

const { Pool } = require('pg');

const SECRET = 'asklkdjwqportityakmajdejnekn';
 
// Connessione ai database
const db_rent = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'data_rent',
    password: '1324',
    //password: 'giulisa',
    port: 5432,
});
  
const db_user = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'user_web',
    password: '1324',
    //password: 'giulisa',
    port: 5432,
});
  
module.exports = { db_rent, db_user, SECRET };