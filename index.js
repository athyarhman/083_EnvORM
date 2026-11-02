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

app.get('/komik', async (req, res) => {
    try {
        const komik = await dB.Komik.findAll();
        res.send(komik);
    } catch (err) {
        res.send(err);
    }
});

app.get('/komik/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const komik = await dB.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).send({message: 'Komik tidak ditemukan'});
        }
        await komik.update(data);
        res.send({message: 'Komik berhasil diperbarui', komik});
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/komik/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const komik = await dB.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).send({message: 'Komik tidak ditemukan'});
        }
        await komik.destroy();
        res.send({message: 'Komik berhasil dihapus'});
    } catch (err) {
        res.status(500).send(err);
    }
});
