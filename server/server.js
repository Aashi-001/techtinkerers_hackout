const express = require('express');
const app = express();
const port = 8000;
const mongoose = require('mongoose');
const User = require('./models/users');
const Rentals = require('./models/rentals');
const Accommodation = require('./models/accomodation');
const bodyParser = require('body-parser');

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://aashi2673:Dtphhy7LdORi2W10@cluster0.m0trsxu.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
connectDB();

app.get('/', (req, res) => {
  res.send('PORT 8000');
});

app.get('/api/accommodations/:cityName', async (req, res) => {
  console.log(req.params.cityName);
  try {
    const cityName = req.params.cityName;
    console.log(cityName);
    const accommodations = await Accommodation.find({ cityname: cityName });
    console.log(accommodations);
    res.status(200).json({ success: true, accommodations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.get('/api/users/rewards', async (req, res) => {
  console.log(req.query.email);
  try {
    const userId = req.query.email;
    const user = await User.findOne({ email: userId });
    console.log(user)

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }
    console.log(user.reward_points);
    res.status(200).json({ success: true, rewardPoints: user.reward_points });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    res.status(200).json({ success: true, user: {email: user.email, points : user.reward_points}, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/api/signup', async (req, res) => {
  console.log(req.body);
  const { email, password, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    const newUser = new User({
      email,
      password,
      phone: phone,
      reward_points: 0,
    });
    await newUser.save();

    res.status(200).json({ success: true, message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/api/users/rewards', async (req, res) => {
  try {
    const userEmail = req.body.email;
    const rewardPoints = req.body.rewardPoints;

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    user.reward_points = rewardPoints;
    await user.save();

    res.status(200).json({ success: true, message: 'Reward points updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.listen(port, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('Listening on port http://localhost:' + port);
  });
  