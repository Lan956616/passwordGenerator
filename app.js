const express = require('express')
const app = express()

const port = 3000

//設定路由
app.get('/', (req,res)=>{
  res.send('123')
})

//監聽伺服器
app.listen(port, ()=>{
  console.log(`express server is running on http://localhost:${port}`)
})
