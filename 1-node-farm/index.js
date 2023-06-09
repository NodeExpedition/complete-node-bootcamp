// stands for file system
const fs = require("fs")
/*
FILE
*/
// const path = require("path")
// const text = fs.readFileSync(
//   path.resolve(__dirname, "./starter/txt/input.txt"),
//   "utf-8"
// )

// #1 blocking, synchronous way
// const text = fs.readFileSync("./starter/txt/input.txt", "utf-8")
// console.log(text)

// const textOut = fs.writeFileSync(
// "./starter/txt/random.txt",
// `This is the time right now ${Date.now()}`
// )
// const outPut = fs.readFileSync("./starter/txt/random.txt", "utf-8")
// console.log(outPut)

// Non-blocking, asynchronous way
fs.readFile("./starter/txt/start.txt", "utf-8", (err, data1) => {
  if (err) {
    console.log("couldn't find this file")
    return
  }
  fs.readFile(`./starter/txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2)
    fs.writeFile(
      "./starter/txt/newInput.txt",
      `${data1}\n\t${data2}`,
      (err) => {
        console.log("Your file has been written :D")
      }
    )
  })
})
console.log("hello world")
