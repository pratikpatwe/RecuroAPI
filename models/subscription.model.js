import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
 name:{
  type: String,
  required: [true, 'Subscription name is required'],
  trim: true,
  minLength: [2, 'Subscription name must be at least 2 characters long'],
  maxLength: [50, 'Subscription name must be at most 50 characters long'],
 },
 price:{
  type: Number,
  required: [true, 'Subscription price is required'],
  min: [0, 'Subscription price must be at least 0'],
  max: [1000, 'Subscription price must be at most 1000'],
 },
 currency:{
  type: String,
  enum: ['USD', 'EUR', 'GBP', 'INR'],
  required: [true, 'Subscription currency is required'],
  default: 'USD',
 },
 frequency:{
  type: String,
  enum: ['daily', 'weekly', 'monthly', 'yearly'],
  required: [true, 'Subscription frequency is required'],
  default: 'monthly',
 },
 category:{
  type: String,
  enum: ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'],
  required: [true, 'Subscription category is required'],
  default: 'general',
 },
 paymentMethod:{
  type: String,
  required: [true, 'Subscription payment method is required'],
  trim: true,
 },
 status:{
  type: String,
  enum: ['active', 'cancelled', 'expired'],
  required: [true, 'Subscription status is required'],
  default: 'active',
  },
  startDate:{
   type: Date,
   required: [true, 'Subscription start date is required'],
   validate: {
    validator: function(value){
     return value <= new Date();
    },
    message: 'Subscription start date must be in the past',
   },
  },
  renewalDate:{
    type: Date,
    //required: [true, 'Subscription renewal date is required'],
    validate: {
     validator: function(value){
      return value > this.startDate;
     },
     message: 'Subscription renewal date must be after the start date',
    },
   },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
    index: true,
   }
}, {timestamps: true});






subscriptionSchema.pre('save', function(next){
 if(!this.renewalDate){
  const renewalPeriod = {
   daily: 1,
   weekly: 7,
   monthly: 30,
   yearly: 365,
  };

  this.renewalDate = new Date(this.startDate);
  this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]);
}

if(this.renewalDate < new Date()){
 this.status = 'expired';
}

next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;