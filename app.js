const express = require('express');
// bisogna installare un pacchetto npm install --save body-parser per comunicare all'app che tipo di body passeremo
const bodyParser = require('body-parser');
const feedRoutes = require('./routes/feed');
const cors = require('cors');
// const db = require('./utils/database');
const sequelize = require('./utils/database');

const app = express();
// dobbiamo dire alla nostra applicazione che tipo di body gli andremo a passare, in questo caso un application/json
app.use(bodyParser.json())
app.use(cors())
// gestione CORS
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Header','Content-Type,Authorization');
    next();
});

//con questo rendiamo raggiungibile dall'esterno una cartella (in questo caso public per la visualizzazione delle immagini)
app.use(express.static('public'));

app.use((req,res,next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err =>{
        console.log('Error find User');
    })
});

app.use('/feed', feedRoutes);

const Post =  require('./models/post');
const User =  require('./models/user');

// la parte relativa a constraints e onDelete è opzionale
User.hasMany(Post)
Post.belongsTo(User,{constraints: true, onDelete: 'CASCADE'})

sequelize.authenticate().then(rec => {
    console.log('Connessione stabilita con successo')
    // il force: true cancella tutto il contenuto della tabella post quindi bisogna far attenzione nel caso nella tabella ci siano già dati
    // sequelize.sync({force: true})
    sequelize.sync({force : true})
    .then((result) => {
        return User.findByPk(1);
    })
    .then(user => {
        if(!user){
            return User.create({name: 'Amedeo', email: 'amedeopro@me.com', password: 'admin'})
        }
        return user
    })
    .then((user) => {
        console.log(user)
        app.listen(8080);
    })
    .catch(err => {
        console.log('Errore di sincronizzazione', err)
    });
})
.catch(err => {
    console.log('Errore di connessione al DB', err)
});
