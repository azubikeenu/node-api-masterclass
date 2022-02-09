const { Schema, model } = require('mongoose');

const slugify = require('slugify');

const bootcampSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Must provide a name'],
    unique: [true, 'Bootcamp must have a unique name'],
    maxlength: [50, 'Bootcamp must not have more than 50 characters'],
    trim: true,
  },
  slug: String,
  description: {
    type: String,
    require: [true, 'Bootcamp must have a description'],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Must provide a valid url',
    ],
  },
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Must provide a valid email',
    ],
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number must not contian more than 20 characters'],
  },
  address: {
    type: String,
    required: [true, 'Must provide and address'],
  },

  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  careers: {
    type: [String],
    required: true,
    enum: [
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Data Science',
      'Business',
      'Other',
    ],
  },
  avgRating: {
    type: Number,
    min: [1, 'Must not be less than 1'],
    max: [10, 'Must not be greated than 10'],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

bootcampSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = model('Bootcamp', bootcampSchema);
