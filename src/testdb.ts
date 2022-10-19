const {Client} = require('pg');

const client = new Client({
    user: 'christopher',
    host: 'localhost',
    database: 'test',
    password: 'password',
    post: 5432,
});



export const meme = (): void => {
    
    client.connect();

    client.query('Select * from users', (err: any, res: any) => {
        if(!err) {
            console.log(res.rows);
        } else {
            console.log(err.message);
        }
        client.end();
})

}

