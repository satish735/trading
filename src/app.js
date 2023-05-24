const express = require('express');
const path = require('path');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());


const axios = require('axios');

const API_KEY = 'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?apiKey=AKUtGf7jdIJWjVgwjwTaiOzhTIkrNSLk';

const apiUrl = "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?apiKey=AKUtGf7jdIJWjVgwjwTaiOzhTIkrNSLk";
axios.get(apiUrl, {
  headers: {
    'Authorization': `Bearer ${API_KEY}`
  }
})
  .then(response => {
    const data = response.data;
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error.message);
  });






app.post("/login", (req, res) => {
  res.sendFile("login.html");
})


app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  // Compare passwords
  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  });
});















// connect to MongoDB
const uri = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(uri);
const databaseName = 'trading';
client.connect((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB');
  client.close();
});


async function insertData(data) {
  try {
    const database = client.db('trading');
    const collection = database.collection('user');

    // Insert the data
    const result = await collection.insertOne(data);
    console.log('Data inserted:', result.insertedId);
  } catch (error) {
    console.error('Error inserting data:', error);
  }
}






const port = 3000;
const htmlfile = path.join(__dirname, "../src/html");
app.use(express.static(htmlfile));



app.get('/', (req, res) => {
  // res.sendFile('index.html');
  res.status(201).render("index");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.get('/form-submit', (req, res) => {
  const user_name = req.query.name;
  const user_email = req.query.email;
  const user_password = req.query.password;
  const user_image = req.query.image;

  const user = {
    name: user_name,
    email: user_email,
    password: user_password,
    image: user_image
  };
  insertData(user);



  // Create a transporter using SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    service: 'Gmail',
    auth: {
      user: 'satish2021choudhary@gmail.com',
      pass: 'qvbyvhvpghpphnnk',
    },
  });


  const mailOptions = {
    from: 'satish2021choudhary@gmail.com',
    to: 'satish12choudhary@example.com',
    subject: 'Email Verification',
    html: `Hi ${user_name} Login  your email:  ${user_email} your password is  ${user_password} </a>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
    } else {
      console.log('Email sent:', info.response);
    }
  });


})





