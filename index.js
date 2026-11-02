const express = require('express');
const app = express();
const PORT = 3000;
const dB = require('./models');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

dB.sequelize.sync()
    .then((result) => {
        app.listen(PORT, () => {
            console.log(`Server is started`);
        })
})
.catch((err) => {
    console.log(err);
})

app.post('/komik', async (req, res) => {
    const data = req.body;
    try {
        const komik = await dB.Komik.create(data);
        res,send(komik);
    } catch (err) {
        res.send(err);
    }  
});