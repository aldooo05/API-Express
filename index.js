const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  response(200, "API V1 Ready to go", "Ini pesan berhasil", res);
});

app.get("/mahasiswa/spesifik/:nim", (req, res) => {
  const nim = req.params.nim;
  const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`;
  db.query(sql, (err, results) => {
    if (err) {
      response(500, null, "Internal Server Error", res);
    } else {
      response(200, results, "Data Berhasil ditambahkan", res);
    }
  });
});

app.get("/mahasiswa/:nim", (req, res) => {
  const nim = req.params.nim;
  response(200, `Data mahasiswa dengan ID ${nim}`, res);
});

app.post("/mahasiswa", (req, res) => {
  const { nim, namaLengkap, kelas, alamat } = req.body;

  console.log(req.body);

  const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES
    ('${nim}', '${namaLengkap}', '${kelas}', '${alamat}')`;

  db.query(sql, (err, results) => {
    if (err) {
      response(500, null, "Internal Server Error", res);
    } else {
      if (results.affectedRows) {
        console.log("Data masuk");
        response(200, results, "Data Added Successfully", res);
      } else {
        console.log("Data tidak masuk");
        response(400, null, "Bad Request", res);
      }
    }
  });
});

app.put("/mahasiswa", (req, res) => {
  response(200, "INI PUT ATAU UPDATE DATA", res);
});

app.delete("/mahasiswa", (req, res) => {
  response(200, "INI DELETE DATA", res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
