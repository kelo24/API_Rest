const express = require('express');
const app = express();
const morgan = require('morgan');

// settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use(require('./routes/dataCreator'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/users', require('./routes/users'));
app.use('/api/wondersworld', require('./routes/wonders'));

// starting the server
app.listen(app.get('port'), function () {
    console.log(`Server on port ${3000}`);
})

