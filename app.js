const express = require('express')
const app = express()
const {engine} = require('express-handlebars')

const port = 3000

app.engine('.hbs', engine({extname:'.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')

//取用靜態檔案
app.use(express.static('public'))

//設定路由
app.get('/', (req,res)=>{
  res.render('index')
})

//監聽伺服器
app.listen(port, ()=>{
  console.log(`express server is running on http://localhost:${port}`)
})
