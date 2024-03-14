// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./database'); // Adjust import if needed
const contactRoutes = require('./Route/contactRoute');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use('/contacts', contactRoutes);


sequelize.sync().then(function () {
  return User.create({
      first_name: 'janedoe'
  });
}).then(function (jane) {
  console.log(jane.get({
      plain: true
  }))})
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });

