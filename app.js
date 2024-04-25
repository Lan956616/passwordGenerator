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
  
  //↓↓↓↓↓↓↓↓↓↓↓↓↓↓第三次繳交新增↓↓↓↓↓↓↓↓↓↓↓↓↓↓

  //如果有勾選此選項 則在 刪除掉不要的字元後的此選項 隨機選一
  if (option.lowercase === 'on') {
    const tempLowercase = lowercase.filter((eachLowercase) => {
      return !option.exclude.includes(eachLowercase)
    })
    password += tempLowercase[Math.floor(Math.random() * tempLowercase.length)]
  }

    if (option.uppercase === 'on') {
    const tempUppercase = uppercase.filter((eachUppercase) => {
      return !option.exclude.includes(eachUppercase)
    })
    password += tempUppercase[Math.floor(Math.random() * tempUppercase.length)]
  }

   if (option.number === 'on') {
    const tempNumber = number.filter((eachNumber) => {
      return !option.exclude.includes(eachNumber)
    })
    password += tempNumber[Math.floor(Math.random() * tempNumber.length)]
  }
  
  if (option.symbols === 'on') {
    const tempSymbols = symbols.filter((eachSymbols) => {
      return !option.exclude.includes(eachSymbols)
    })
    password += tempSymbols[Math.floor(Math.random() * tempSymbols.length)]
  }

  //console.log('個自取一', password)
  //console.log('不要出現', option.exclude)

  
  //接著在隨機從data陣列中隨機補足指定密碼長度
  const leftPasswordLength = optionLength - password.length
  for (let i = 1; i <= leftPasswordLength; i++) {
    password += data[Math.floor(Math.random() * data.length)]
  }
  //console.log('補滿字數', password)

  //再把產生好的密碼順序打散
  password = getWashedString(password)

  //console.log('洗牌後', password)

  return password
  
}

//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑第三次繳交新增↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑




//↓↓↓↓↓↓↓↓↓↓↓↓↓↓第二次繳交新增↓↓↓↓↓↓↓↓↓↓↓↓↓↓

//重新排序陣列函式
function getWashedString(oldString) {
  let result = ''
  let RandomNumberArray = getRandomNumberArray(oldString.length)
  for (let i = 0; i < oldString.length; i++) {
    result += oldString[RandomNumberArray[i]]
  }
  return result
}

function getRandomNumberArray(count) {
  let number = Array.from(Array(count).keys())
  for (let index = number.length - 1; index >= 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [number[index], number[randomIndex]] = [number[randomIndex], number[index]]
  }
  return number;
}

//↑↑↑↑↑↑↑↑↑↑↑↑↑↑第二次繳交新增↑↑↑↑↑↑↑↑↑↑↑↑↑↑