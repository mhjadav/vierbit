const express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
userRoutes = require("./components/users/usersRoutes");
roleRoutes = require('./components/role/roleRoutes');
const domainRoutes = require("./components/domain/domainRoutes");
const productRoutes = require("./components/products/productsRoutes");
const authRoutes = require('./components/auth/authRoutes')
const storeRoutes = require('./components/stores/storesRoute')
const productsUploadRoutes = require('./components/productsUpload/productsUploadRoutes')
const logger = require('./logger');
const app = express();


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://nikunj:nikunj@nirlom-psx28.mongodb.net/Nirlom?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
app.get('/', (req, res) => res.send('Welcome to Nirlom API Project'));
app.use('/api', userRoutes);
app.use('/api', roleRoutes);
app.use('/api', domainRoutes);
app.use('/api', productRoutes);
app.use('/api', authRoutes);
app.use('/api', storeRoutes);
app.use('/api', productsUploadRoutes);

app.get('/upload-images', (req,res) => {
    res.sendFile(__dirname + '/index.html');
})
const port = process.env.PORT || 8081;

app.listen(port,(() => console.log("Server running on port " + port)));