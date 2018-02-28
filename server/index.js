// Pulling in the .env file
require("dotenv").config();

// Initializing dependencies
const express = require("express");
const session = require("express-session");
const { json } = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const massive = require("massive");
const path = require("path");

// Setting port
const port = 3005;

// Initializing app
const app = express();

// Pulling variables from the .env
const {
  CONNECTION_STRING,
  DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  SESSION_SECRET
} = process.env;

// Connecting database
massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("DB Connected!");
  })
  .catch(console.log());

// Leting the app know to use cors and body-parser
app.use(json());
app.use(cors());

// Production run build
//app.use(express.static(`${__dirname}/../build`));

// Initializing sesssions
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10000000
    }
  })
);

// Setting up passport authentication
app.use(passport.initialize());
app.use(passport.session());

// Setting up Auth0 strategy
passport.use(
  new Auth0Strategy(
    {
      domain: DOMAIN,
      clientSecret: CLIENT_SECRET,
      clientID: CLIENT_ID,
      scope: "openid profile",
      callbackURL: "/auth"
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      app
        .get("db")
        .get_user_by_auth_id(profile.id)
        .then(response => {
          if (!response) {
            app
              .get("db")
              .create_useR_by_auth_id([profile.displayName, profile.id])
              .then(response => {
                return done(null, response[0]);
              })
              .catch(console.log());
          } else {
            return done(null, response[0]);
          }
        });
    }
  )
);

// Adding user to session
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Basic auth endpoints
app.get("/login", passport.authenticate("auth0"));

app.get(
  "/auth",
  passport.authenticate("auth0", { successRedirect: "/user" }),
  (req, res) => {
    res.status(200).json(req.user);
  }
);

app.get("/user", (req, res) => {
  if (!req.user) {
    return res.status(500).json({ err: "User Not Authenticated" });
  } else {
    res.status(200).json(req.user);
  }
});

app.get("/user/logout", (req, res) => {
  req.logout();
  req.session.destroy(() => {
    res.redirect("/");
  });
});

// Application endpoints

const dogController = require("./controllers/dogController")

// old endpoints 
app.post('/api/add-dog', dogController.addDog);
app.get('/api/get-all-dogs', dogController.getDogs);
app.post('/api/favorite-dog/:id', dogController.favoriteDog) //gotta finish this b
app.post('/api/upvote-dog/:id', dogController.upvoteDog)
app.post('/api/adopt-dogs', dogController.adoptDogs)
app.post('/api/get-shelters', dogController.getShelters)

app.get('/api/get-user-favs', dogController.getUserFavs)
app.get('/api/get-user-dogs', dogController.getUserDogs)

// Listening
app.listen(port, () => {
  console.log(`I'll be right by your side till ${port}`);
});
