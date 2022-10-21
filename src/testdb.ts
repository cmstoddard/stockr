const { Client } = require('pg');

const client = new Client({
    user: 'christopher',
    host: 'localhost',
    database: 'test',
    password: 'password',
    post: 5432,
});

export const startClient = () => {
    client.connect();
    console.log('client started');
}

export const meme = (msgInfo: Map<string, string>) => {
    let name = msgInfo.get('username');

    //client.query('Select * from users', (err: any, res: any) => {
    client.query('INSERT INTO users (name) VALUES ($1) RETURNING *', [name], (err: any, res: any) => {
        if (!err) {
            console.log(res.rows);
        } else {
            console.log(err.message);
        }
    });
}

