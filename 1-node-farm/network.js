const http = require("http")
const fs = require("fs")
const path = require("path")
/*
SERVER
*/
const server = http.createServer((req, res) => {
  console.log(req)
  if (req.url === "/home") {
    const filePath = path.join(__dirname, "index.html")

    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end(`Error reading file: ${err}`)
      } else {
        res.statusCode = 200
        res.setHeader("Content-Type", "text/html")
        res.end(data)
      }
    })
  } else {
    res.statusCode = 404
    res.end("Not Found")
  }
})

server.listen(8080, "localhost", () => {
  console.log("Server listening on port 8080")
})
