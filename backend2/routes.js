const express = require('express')
const routes = express.Router()

//
routes.get('/cursos', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM cursos', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.get('/verpubs', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM publicaciones ORDER BY id DESC ', (err, rows)=>{
            if(err) return res.send(err)
            console.log(rows);
            res.json(rows)
        })
    })
})

routes.post('/addpub', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO publicaciones set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)
            res.send('pub added!')
        })
    })
})

module.exports = routes