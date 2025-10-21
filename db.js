const mysql = require('mysql');

// Configure the conexión
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // you can change the name of user
  password: 'tu_contraseña', // and also you can change the password
  database: 'server_side_db'
});

// Conect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

// data validation
function isValid(user) {
  const nameRegex = /^[a-zA-Z0-9]{1,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;
  const eircodeRegex = /^[0-9][a-zA-Z0-9]{6}$/;

  return (
    nameRegex.test(user.first_name) &&
    nameRegex.test(user.last_name) &&
    emailRegex.test(user.email) &&
    phoneRegex.test(user.phone_number) &&
    eircodeRegex.test(user.eircode)
  );
}

// Inser data
function insertUser(user) {
  return new Promise((resolve, reject) => {
    if (!isValid(user)) {
      return reject(new Error("invalid data cannot be inserted."));
    }

    const query = `INSERT INTO user_data (first_name, last_name, email, phone_number, eircode) VALUES (?, ?, ?, ?, ?)`;
    const values = [user.first_name, user.last_name, user.email, user.phone_number, user.eircode];

    connection.query(query, values, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

module.exports = { insertUser };
