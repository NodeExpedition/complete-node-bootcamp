const http = require("http")
const fs = require("fs")
const url = require("url")
// const
// const path = require("path")
/*
SERVER
*/

// execute only once when server starts as async
// __dirname usually mean where the current file is located

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName)
  output = output.replace(/{%PRODUCT_IMAGE%}/g, product.image)
  output = output.replace(/{%PRODUCT_LOCATION%}/g, product.from)
  output = output.replace(/{%PRODUCT_NUTRIENTS%}/g, product.nutrients)
  output = output.replace(/{%PRODUCT_QUANTITY%}/g, product.quantity)
  output = output.replace(/{%PRODUCT_PRICE%}/g, product.price)
  // output = output.replace(/{%PRODUCT_NOT_ORGANIC%}/g, product.organic)
  output = output.replace(/{%PRODUCT_DESCRIPTION%}/g, product.description)
  output = output.replace(/{%PRODUCT_ID%}/g, product.id)

  if (!product.organic)
    output = output.replace(/{%PRODUCT_NOT_ORGANIC%}/g, "not-organic")
  return output
}
const tempOverview = fs.readFileSync(
  `${__dirname}/starter/templates/template-overview.html`,
  "utf-8"
)
const tempCard = fs.readFileSync(
  `${__dirname}/starter/templates/template-card.html`,
  "utf-8"
)
const tempProduct = fs.readFileSync(
  `${__dirname}/starter/templates/template-product.html`,
  "utf-8"
)
const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, "utf-8")
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
  // console.log(req.url)
  // console.log(url.parse(req.url))
  // const pathname = req.url

  const { query, pathname } = url.parse(req.url, true)

  // Overview page
  if (pathname === "/overview" || pathname === "/") {
    res.writeHead(200, { "Content-type": "text/html" })
    const cardHtml = dataObj
      .map((elem) => replaceTemplate(tempCard, elem))
      .join("")
    console.log(cardHtml)
    const output = tempOverview.replace(/{%PRODUCT_CARD%}/g, cardHtml)
    res.end(output)

    // Product page
  } else if (pathname === "/product") {
    // console.log(query)
    res.writeHead(200, { "Content-type": "text/html" })
    const product = dataObj[query.id]
    const output = replaceTemplate(tempProduct, product)
    res.end(output)

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" })
    res.end(data)
  } else {
    // res.statusCode = 404
    // header always before the reponse
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    })
    res.end("<h1>page not found!</h1>")
  }
})

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000")
})
// const server = http.createServer((req, res) => {
//   console.log(req)
//   if (req.url === "/home") {
//     const filePath = path.join(__dirname, "index.html")

//     fs.readFile(filePath, "utf-8", (err, data) => {
//       if (err) {
//         res.statusCode = 500
//         res.end(`Error reading file: ${err}`)
//       } else {
//         res.statusCode = 200
//         res.setHeader("Content-Type", "text/html")
//         res.end(data)
//       }
//     })
//   } else {
//     res.statusCode = 404
//     res.end("Not Found")
//   }
// })

// server.listen(8080, "localhost", () => {
//   console.log("Server listening on port 8080")
// })
