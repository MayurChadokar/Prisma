const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const port = 3000 || process.env.PORT;
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');


app.use(express.json());
app.use(cookieParser());

app.use('/api', userRoutes);
app.use('/api', postRoutes);

app.get('/', (req, res) => {
    res.send('this is my backend ');
});

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});