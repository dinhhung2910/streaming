const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  code: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
  year: {
    type: Number
  },
  onlineLink: {
    type: String,
  },
  sources: [{
    size: {
      type: Number
    },
    link: {
      type: String
    }
  }],
  isAvailable: {
    type: Boolean
  },
  tags: [{
    code: {
      type: String,
      required: true
    },
    description: {
      type: String,
    }
  }],
  point: {
    type: Number
  },
  images: {
    poster: {
      type: String
    },
    background: {
      type: String
    },
    thumbnail: {
      type: String
    }
  },
  subtitles: [{
    language: {
      type: String,
      required: true
    },
    srclang: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  }]
});

module.exports = Movie = mongoose.model('movie', movieSchema);