require('dotenv').config();

const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      user = require('./controllers/user/userRoute'),
      userAuth = require('./controllers/user/userRouteAuth'),
      game = require('./controllers/game/gameRoute'),
      gameAuth = require('./controllers/game/gameRouteAuth'),
      commentAuth = require('./controllers/comment/commentRouteAuth'),
      sequelize = require('./db');

app.use(require('./middleware/headers'));

app.use(express.static(__dirname + '/public'));

sequelize.sync();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Test success');
});

// Unprotected
app.use('/user', user);
app.use('/games', game);

// Protected
app.use(require('./middleware/validate-session'));
app.use('/user', userAuth);
app.use('/games', gameAuth);
app.use('/games', commentAuth);

app.listen(process.env.PORT, () => {
    console.log(`App is live on port ${process.env.PORT}`);
});