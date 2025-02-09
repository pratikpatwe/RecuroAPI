import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: [true, 'Name is required'],
    trim: true,
    minLenght: [2, 'Name must be at least 2 characters long'],
    maxLength: [50, 'Name must be at most 50 characters long'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: true,
    minLenght: [9, 'Email must be at least 9 characters long'],
    maxLength: 300,
    lowercase: true,
    match: [
      /\S+@\S+\.\S+/,
      'Email must be a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLenght: [8, 'Password must be at least 8 characters long'],
    maxLength: 300,
  },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;