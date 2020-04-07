const express = require('express');
var bodyParser = require('body-parser');
const session = require('express-session');

const sessionChecker = (req, res, next) => {
    if (req.session.user && req.session.user != {}) {
        next();
    } else {
        res.redirect('/Login');
    }
};

const sessionAdminChecker = (req, res, next) => {
    if (req.session.user && req.session.user.admin == true) {
        next();
    } else {
        res.redirect('/Home');
    }
};

const sessionManagerChecker = (req, res, next) => {
    if (req.session.user && req.session.user.manager == true) {
        next();
    } else {
        res.redirect('/Home');
    }
};

const app = express(),
    port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
    key: 'user_sid',
    secret: 'Shh, its a secret!',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60000000
    }
}));

const routes = require("./back/route.js");

app.route("/Home").get((req, res) => {
    res.sendFile(__dirname + '/front/index.html');
});

app.route("/Account")
    .get(sessionChecker, (req, res) => {
        //.get((req, res) => {
        res.sendFile(__dirname + '/front/account.html');
    });

app.route("/AddHotel")
    .get(sessionAdminChecker, (req, res) => {
        //.get((req, res) => {
        res.sendFile(__dirname + '/front/addHotel.html');
    });

app.route("/Hotel")
    .get((req, res) => {
        res.sendFile(__dirname + '/front/Hotel.html');
    });

app.route("/CreateManager")
    .get((req, res) => {
        res.sendFile(__dirname + '/front/CreateManager.html');
    });

app.route("/About")
    .get((req, res) => {
        res.sendFile(__dirname + '/front/about.html');
    });

app.route("/Booking")
    .get(sessionChecker, (req, res) => {
        res.sendFile(__dirname + '/front/booking.html');
    });

app.route("/Register")
    .get((req, res) => {
        res.sendFile(__dirname + '/front/register.html');
    });

app.get('/', (req, res) => {
    res.redirect('/Home');
});

app.route("/Login")
    .get((req, res) => {
        res.sendFile(__dirname + '/front/login.html');
    });

app.route("/AdminMenu")
    .get(sessionAdminChecker, (req, res) => {
        res.sendFile(__dirname + '/front/admin.html');
    });

app.route("/Manager")
    .get(sessionManagerChecker, (req, res) => {
        res.sendFile(__dirname + '/front/manager.html');
    });


app.use("/js", express.static("./front/js"));

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

routes(app);

app.listen(port, () => console.log("server running at localhost:" + port));
