import bcrypt from 'bcrypt';
import mysql from 'mysql2';

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'xp',
});

con.connect(async (err) => {
  if (err) throw err;
  console.log('Starting Seeds');
  const password1 = await bcrypt.hash('123456', 10);
  const password2 = await bcrypt.hash('xpinc9', 10);
  const password3 = await bcrypt.hash('user123', 10);

  const sql = `INSERT INTO xp.clients (name, email, password) VALUES ("Leandro", "gmail@hotmail.com", "${password1}"),
  ("XPInc", "xpinc@xp.com", "${password2}"), ("user", "user@email.com", "${password3}")`;
  con.query(sql, (error) => {
    if (err) throw error;
    console.log('Create default users');
  });

  const sqlAssets = 'INSERT INTO xp.assets (name, quantity, value) VALUES("XPI", 25, 5), ("GOLD", 25, 1725), ("AAPL", 4, 154), ("SILVER", 60, 18.49), ("BTC", 10, 22323), ("MSFT", 50, 260.36);';
  con.query(sqlAssets, (error) => {
    if (err) throw error;
    console.log('Create assets');
  });
  con.end();
});
