const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//connection database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kasir"
})

db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("MySQL Connected")
    }
})

// end-point akses data pelanggan
app.get("/kasir", (req, res) => {
    // create sql query
    let sql = "select * from data_kasir"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                data_pelanggan: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

//end-point akses data pelanggan berdasarkan id_pelanggan tertentu
app.get("/kasir/:id", (req, res) => {
    let data = {
        id_pelanggan: req.body.id_kasir
    }
    // create sql query
    let sql = "select * from data_kasir where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                data_kasir: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point menyimpan data pelanggan
app.post("/kasir", (req,res) => {

    // prepare data
    let data = {
        id_kasir: req.body.id_kasir,
        nama_kasir: req.body.nama_kasir,
        status_kasir: req.body.status_kasir
    }

    // create sql query insert
    let sql = "insert into data_kasir set ?"
    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response) // send response
    })
})

// end-point mengubah data pelanggan
app.put("/kasir", (req,res) => {

    // prepare data
    let data = [
        // data
        {
            id_kasir: req.body.id_kasir,
            nama_kasir: req.body.nama_kasir
        },

        // parameter (primary key)
        {
            id_kasir: req.body.id_kasir
        }
    ]

    // create sql query update
    let sql = "update data_kasir set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response) // send response
    })
})

// end-point menghapus data pelanggan berdasarkan id_pelanggan
app.delete("/kasir/:id", (req,res) => {
    // prepare data
    let data = {
        id_kasir: req.body.id_kasir
    }

    // create query sql delete
    let sql = "delete from data_kasir where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response) // send response
    })
})



app.listen(8000, () => {
    console.log("iyey")
})