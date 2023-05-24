const express = require('express');
const path = require('path');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const nodemailer = require('nodemailer');






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

 
  


const app = express();
const port = 3000;
const htmlfile = path.join(__dirname, "../src/html");
app.use(express.static(htmlfile));



app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.get('/form-submit', (req, res) => {
  const user_name = req.query.name;
  const user_email = req.query.email;
  const user_password = req.query.password;

  const user = {
    name: user_name,
    email: user_email,
    password: user_password
  };

  const myData = {
    name: 'sam Doe',
    age: 30,
    email: 'john@example.com'
  };
  
  insertData(user);
  
  console.log(user);
  





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