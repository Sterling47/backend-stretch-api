const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.get('/', (req,res) => {
    res.send('Data')
})

app.listen(port, () => {
    console.log(`Express Server Running on port ${port}`)
})