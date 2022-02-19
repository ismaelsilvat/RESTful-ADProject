const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const multer = require('multer');
const path = require('path');
const port = process.env.PORT || 5000;

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, 'files/')
    },
    filename: (req,file,cb) => {
        cb(null, Date.now()+'-'+file.originalname)
    }
})
const upload = multer({storage})

app.set('view engine', 'ejs')
app.use(cors());
app.use(express.json());
app.get("/")

app.post("/anuncio", async(req,res) =>{
    try {
        const infos = req.body;
        console.log(infos);
        const newName = await pool.query('INSERT INTO ANUNCIO(TITULO,DESCRICAO,DATA_INICIAL,DATA_FINAL,CATEGORIA,EMAIL,TELEFONE) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING IDANUNCIO;',
        [infos.titulo,infos.descricao,infos.dataInicial,infos.dataFinal,
        infos.Categoria,infos.Email,infos.Telefone]);
        res.json(newName.rows);
    } catch (error) {
        console.log("Erro: " + error.message);
    }
});

app.post("/file", upload.single('img'), async(req,res) =>{
    try {               
        console.log(req.body);
        console.log(req.file);
        await pool.query('UPDATE ANUNCIO SET SRC = $1 WHERE IDANUNCIO = $2',[req.file.filename, req.body.maxId])
        
    } catch (error) {
        console.log(error.message);
    }
});

app.get("/anuncios", async(req,res) =>{
    try {
      const allAnuncios = await pool.query("SELECT * FROM ANUNCIO;")
      res.json(allAnuncios.rows)    
    } catch (error) {
        console.log("Erro: " + error.message);
    }
});

app.get("/files", async(req,res) =>{
    try {
      const newFile = await pool.query("SELECT * FROM FILE;")
      res.json(newFile.rows)
    } catch (error) {
        console.log("Erro: " + error.message);
    }
});

app.get("/maxId", async(req,res) =>{
    try {
        const maxId = await pool.query("SELECT MAX(IDANUNCIO) FROM ANUNCIO GROUP BY IDANUNCIO;");
        res.json(maxId);
    } catch (error) {
        console.log(error.message);
        
    }
});

app.listen(port, () =>{
    console.log(`Conected at localhost:${port}`);
});