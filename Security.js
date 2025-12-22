// Secure implementation
function searchUsersSafe(name) {
  // Parameterized query - PROTECTED AGAINST INJECTION
  const query = 'SELECT * FROM users WHERE name LIKE ?';
  db.query(query, [`%${name}%`], (err, results) => { /* handle results */ });
}
