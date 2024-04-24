const express = require('express')
const app = express()
const {engine} = require('express-handlebars')

const port = 3000

app.engine('.hbs', engine({extname:'.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')

//取用靜態檔案
app.use(express.static('public'))
//
app.use(express.urlencoded({ extended: false }))

//設定路由
//主頁面
app.get('/', (req,res)=>{
  res.render('index')
})
//表單提交時
app.post('/', (req,res)=>{
  
  const input = req.body
  //console.log('input', input)
  const password = generatePassword(input)
  //console.log('password', password)
  res.render('index', {password, input})
})

//監聽伺服器
app.listen(port, ()=>{
  console.log(`express server is running on http://localhost:${port}`)
})


function generatePassword(option){
  const optionLength = parseInt(option.passwordLength)
  let data = []
  let password = ''
  const lowercase = [
  'a', 'b', 'c', 'd', 'e', 'f',
  'g', 'h', 'i', 'j', 'k', 'l',
  'm', 'n', 'o', 'p', 'q', 'r',
  's', 't', 'u', 'v', 'w', 'x',
  'y', 'z'
]
  const uppercase = [
  'A', 'B', 'C', 'D', 'E', 'F',
  'G', 'H', 'I', 'J', 'K', 'L',
  'M', 'N', 'O', 'P', 'Q', 'R',
  'S', 'T', 'U', 'V', 'W', 'X',
  'Y', 'Z'
]
  const number = [
  '0', '1', '2', '3',
  '4', '5', '6', '7',
  '8', '9'
]
  const symbols = [
  '!', '@', '#', '$',
  '%', '^', '&', '*',
  '(', ')', '_', '+',
  '='
]
  if (option.lowercase === 'on') {
    data = data.concat(lowercase)
  }
  if (option.uppercase === 'on') {
    data = data.concat(uppercase)
  }
  if (option.number === 'on') {
    data = data.concat(number)
  }
  if (option.symbols === 'on') {
    data = data.concat(symbols)
  }
  
  if (option.exclude.length > 0 ) {
    data = data.filter ((eachData)=>{
      return !option.exclude.includes(eachData)
    })
  }
  
  if (data.length === 0 ) {
    return "You must select at least one character set"
  }

  //↓↓↓↓↓↓↓↓↓↓↓↓↓↓第二次繳交新增↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  //把現有的字元組合重新洗牌
  
  data = getWashedArray(data)
  

  //↑↑↑↑↑↑↑↑↑↑↑↑↑↑第二次繳交新增↑↑↑↑↑↑↑↑↑↑↑↑↑↑

  for (let i = 1; i <= optionLength; i++) {
    password += data[Math.floor(Math.random() * data.length)]
  }
  return password
  
}


//↓↓↓↓↓↓↓↓↓↓↓↓↓↓第二次繳交新增↓↓↓↓↓↓↓↓↓↓↓↓↓↓

//重新排序陣列函式
function getWashedArray(oldArray) {
  let result = []
  let RandomNumberArray = getRandomNumberArray(oldArray.length)
  for (let i = 0; i < oldArray.length; i++) {
    result.push(oldArray[RandomNumberArray[i]]);
  }
  return result
}

function getRandomNumberArray(count) {
  let number = Array.from(Array(count).keys());
  for (let index = number.length - 1; index >= 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [number[index], number[randomIndex]] = [number[randomIndex], number[index]];
  }
  return number;
}

//↑↑↑↑↑↑↑↑↑↑↑↑↑↑第二次繳交新增↑↑↑↑↑↑↑↑↑↑↑↑↑↑