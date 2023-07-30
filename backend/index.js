const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const passportJWT = require('passport-jwt')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const nunjucks = require('nunjucks')
const axios = require('axios')
const urlEncodedParser = express.urlencoded({ extended: false })
const PORT = process.env.PORT || 5000

const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

const corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie', 'Cookie'],
  maxAge: 3600,
  exposedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie', 'Cookie']
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())


const api = axios.create({
  // baseURL: "https://nodejsproject-5be6.restdb.io/rest",
  baseURL: "https://nodejs2-f1ab.restdb.io/rest",
  headers: {
      // "x-apikey": '02325bf29b68c92adcdbcf6f6a50e0b644bc3'
      "x-apikey": 'da2e0c9fe3479f581c922f3b3802260ebf487'
  }
})

app.get('/', function (req, res) {
  res.send('Hello World1!')
  res.render('App', { message: 'Hello World' });

})

// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage')
})

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
})

// Route POST pour l'inscription d'un utilisateur (nom prenom mail password)
app.post('/register', urlEncodedParser, async (req, res) => {
  const { name, firstname, email, password } = req.body;

  if (!name || !firstname || !email || !password) {
    res.status(400).json({ error: 'Missing required fields.' })
    return
  }

  try {
    const userData = {
      name,
      firstname,
      email,
      password,
    }

    let response;
    response = await api.post(`/utilisateurs`, userData);
    } catch(e) {
      res.status(e.response.status).json({error: e.response.statusText})
    }
});


// Une route POST pour la connection d’un utilisateur (mail password)
app.post('/login', urlEncodedParser, (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({ error: 'Veuillez saisir un mail et un mot de passe' })
    return
  }

  api.get('/utilisateurs')
    .then(response => {
      const users = response.data;
      const user = users.find(user => user.email === email);
      if (!user) {
        res.status(401).json({ error: "L'email et le mot de passe ne correspondent pas" })
        return
      }
      if (user.password !== password) {
        res.status(401).json({ error: "L'email et le mot de passe ne correspondent pas" })
        return
      }
      const token = jwt.sign({ email: user.email}, 'secret');
      res.json({ token });
    })
    .catch(error => {
      res.status(500).json({ message: 'An error occurred while trying to log in', error: error });
    });
});



// Une route GET pour la récupération de la liste des utilisateurs
app.get('/utilisateurs',async (req, res) => {
try {
  return res.json((await api.get('/utilisateurs')).data)
} catch(e) {
    res.status(e.response.status).json({error: e.response.statusText})
}
})

app.get('/utilisateurs/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const response = await api.get(`/utilisateurs?q={"email": "${email}"}`);
    const user = response.data[0];
    if (!user) {
      res.status(404).json({ error: `No user found with email: ${email}` });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while trying to retrieve user data', error: error });
  }
});

app.post('/utilisateurs', urlEncodedParser, async (req, res) => {
  const { name, firstname, email, password } = req.body;

  // Recherche l'id 
  if (!name || !firstname || !email || !password) {
    res.status(400).json({ error: 'Missing required fields.' })
    return
  }

  try {
    const userData = {
      name,
      firstname,
      email,
      password,
    }

    let response;
    response = await api.patch(`/utilisateurs/${id}`, userData);
    res.json(response.data);
  } catch(e) {
    res.status(e.response.status).json({error: e.response.statusText})
  }
});



//Une route GET pour la récupération d’un club de football en utilisant api.get('/listclubs/:id')
app.get('/listclubs/:id',async (req, res) => {
  const id = req.params.id;
  try {
    return res.json((await api.get('/team/'+id)).data)
  } catch(e) {
      res.status(e.response.status).json({error: e.response.statusText})
  }
});
//63fab27caa86075000073e5a


// Une route GET pour le listing des clubs
app.get('/listclubs',async (req, res) => {
  try {
    return res.json((await api.get('/team')).data)
  } catch(e) {
      res.status(e.response.status).json({error: e.response.statusText})
  }
})


//Une même route POST pour l’ajout ET la modification d’un club de football
app.post('/newclub/:team_long_name/:team_short_name/:points/:win/:loose/:nul/:id?', async (req, res) => {
  const { team_long_name, team_short_name, points, win, loose, nul } = req.params;
console.log('debutAPI')
  const id = req.params.id;

  try {
    console.log('test0')
    const teamData = {
      team_long_name,
      team_short_name,
      points,
      win,
      loose,
      nul
    }

    let response;
    if (id) {
      console.log('test01')
      response = await api.patch(`/team/${id}`, teamData);
    } else {
      console.log('test02')
      response = await api.post('/team', teamData);
    }
    console.log('test04')
    res.status(200).json({ message: 'Club saved successfully', data: response.data });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while saving the club', error: error });
  }
});






// Une route DELETE pour la suppression d’un club de football
app.delete('/deleteclub/:id',async (req, res) => {
  const id = req.params.id;
  try {
    return res.json((await api.delete('/team/'+id)).data)
  } catch(e) {
      res.status(e.response.status).json({error: e.response.statusText})
  }
}
);