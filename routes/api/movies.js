const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Movie = require('../../models/Movie');
const config = require('config');

const assestsBaseURL = config.get('assestsBaseURL');
const serverBaseURL = config.get('serverBaseURL');
const videoBaseURL = config.get('videoBaseURL');

const LevenshteinDistance = require('../../utils/LevensteinDistance');

// @ROUTE   GET /api/movies
// @DESC    Get all movies
router.get('/', async(req, res) => {
  try {
    let movies = await Movie
      .find({})
      .sort({_id: -1})
      .select(['-subtitles', '-onlineLink'])
      .lean();
          
    movies = movies.map(item => {
      item.images = item.images || {};

      const x = Object.assign(item, {
        images: {
          poster: assestsBaseURL + item.images.poster,
          background: item.images.background ? (assestsBaseURL + item.images.background) : '',
        }
      });
      return x;
    });

    console.log(movies);
    res.json(movies);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
})

// @ROUTE POST /api/movies/similar
// @DESC  Get similarity movies with current movie
router.get('/similar/:code', async(req, res) => {
  try {
    const movie = await Movie.findOne({code: req.params.code});
    let movies = await Movie.find({}).select(['-subtitles', '-onlineLink']);

    if (!movie) {
      res.json(movies);
    } else {
      for (let i = 0; i < movies.length; i++) {
        movies[i].distance = LevenshteinDistance(movie.name, movies[i].name);
      }
      movies.sort(function(m1, m2) {
        return m1.distance - m2.distance;
      });
      res.json(movies);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});


// @ROUTE   /api/movies/:id
// @DESC    Get movie by id
router.get('/:id', async(req, res) => {
  res.json({status: 'ok'});
})

// @ROUTE   GET /api/movies/code/:code
// @DESC    Get movie by code
router.get('/code/:code', async(req, res) => {
  try {
    
    const movie = await Movie.findOne({code: req.params.code}).lean();
    if (!movie) {
      res.status(404).json({msg: 'Movie not found'});
    } else {

      const x = Object.assign(movie, {
        images: {
          poster: assestsBaseURL + movie.images.poster,
          background: movie.images.background ? (assestsBaseURL +  movie.images.background) : ''
        },
        subtitles: movie.subtitles.map(subtitle => {
          subtitle.link = assestsBaseURL + subtitle.link;
          return subtitle;
        }),
        sources: movie.sources.map(source => {
          source.link = videoBaseURL + source.link;
          return source;
        })
      });

      res.json(x);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
})

// @ROUTE   POST /api/movies/
// @DESC    Create new movie
router.post(
  '/', 
  [
    [
      check('name', 'Movie\'s name is missing').not().isEmpty()
    ]
  ], async(req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    try {
      const {
        name,
        year,
        tags,
        point,
        onlineLink,
        images,
        subtitles
      } = req.body;

      // Convert name to code with random suffix
      let code = change_alias(name);
      code = code.replace(/ /g, '-');
      code = code + '-' + (Date.now() % 100000);

      if (!onlineLink) onlineLink = config.get("defaultFileName");
      let movieObject = {
        name, code, year, tags, point, images, subtitles, onlineLink
      }
      let movie = new Movie(movieObject);
      await movie.save();

      res.json(movie);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

function change_alias(alias) {
  var str = alias;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
  str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
  str = str.replace(/đ/g,"d");
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
  str = str.replace(/ + /g," ");
  str = str.trim(); 
  return str;
}

module.exports = router;