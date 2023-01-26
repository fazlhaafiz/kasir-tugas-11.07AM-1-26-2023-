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
app.get("/menu", (req, res) => {
    // create sql query
    let sql = "select * from data_menu"

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
                data_menu: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

//end-point akses data pelanggan berdasarkan id_pelanggan tertentu
app.get("/menu/:id", (req, res) => {
    let data = {
        id_menu: req.body.id_menu
    }
    // create sql query
    let sql = "select * from data_menu where ?"

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
                data_menu: result // isi data
            }            
        }
        res.json(response) // send response
    })
})

// end-point menyimpan data pelanggan
app.post("/menu", (req,res) => {

    // prepare data
    let data = {
        id_menu: req.body.id_menu,
        nama_menu: req.body.nama_menu,
        kategori: req.body.kategori,
        harga_menu: req.body.harga_menu,
        stok: req.body.stok
    }

    // create sql query insert
    let sql = "insert into data_menu set ?"
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
app.put("/menu", (req,res) => {

    // prepare data
    let data = [
        // data
        {
            id_menu: req.body.id_menu,
            nama_menu: req.body.nama_menu,
            kategori: req.body.kategori,
            harga_menu: req.body.harga_menu,
            stok: req.body.stok
        },

        // parameter (primary key)
        {
            id_menu: req.body.id_menu
        }
    ]

    // create sql query update
    let sql = "update data_menu set ? where ?"

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
app.delete("/menu/:id", (req,res) => {
    // prepare data
    let data = {
        id_menu: req.body.id_menu
    }

    // create query sql delete
    let sql = "delete from data_menu where ?"

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