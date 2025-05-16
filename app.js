//cookie and sesseion er maddome authentication and authorization kore..
//1st) npm i jsonwebtoken and npm i bcryptjs  install korte hobe
//2nd) cookie set korte hobe.. package.json e (main e index.js er jaygay app.js likte hobe).. app.js nam e create korte hobe

// we can read cookie form brouser through "req.cookie()".. first add"npm i cookie-parser".. then require this and app.use(cookieParser())

// bcrypt , password encription and decription kore take.. mane password take different vabe kore save kora database e.. 
// eta korar jonno npm bcrypt teke  full code copy kore niye aslei hobe.. 
//  bcrypt.genSalt(saltRounds, function(err, salt) {
//     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {  // Store hash in your password DB.
//     });
// hash=$2b$10$ST4h0hC7TwhyXFdgxi5qxuk6wh2rg4Hm2MDqQU3SQdcwZ5ZKJxLUK  encripted form of "heloooo" password.

//ekon decreption korar jonno=> bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    // result == true
//    });   eta use kora hohy.. ekane myPlaintextPassword=heloooo and hash=$2b$10$ST4h0hC7TwhyXFdgxi5qxuk6wh2rg4Hm2MDqQU3SQdcwZ5ZKJxLUK.. jodi mile, result "True asbe"

const express=require("express")
const app=express()
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const cookieparser=require("cookie-parser")
app.use(cookieparser())

app.get("/", (req,res)=>{
    res.cookie("name", "Hello cookie")                              // what is cookie? ... Ans-> server teke kichu data Brouser e set kore deya
                                                             // jeta diye amake bar bar login korte hobe na.. ekta proman hisabe cookie set kore deya hoy surver e..
    res.send("DOne")
})



//Password encription part
app.get("/hash", (req,res)=>{

    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("heloooo", salt, function(err, hash) {  // Store hash in your password DB.
        console.log(hash)
    });

});                                                            // saltRounds=10, myPlaintextPassword=your password,                                                               // 
})


// jwt er maddome email ke extra add kore ekta cookie baniye brouser e set kora hocce..
app.get("/jwt", (req,res)=>{
    let token=jwt.sign({email:"riyad@gmail.com"}, "secret")
    console.log(token)// tocken = $2b$10$IELLJTOOBFoBKZ62S3qcHuN4bjCfcqiX6nRemNwBowAjU4wYTzzve eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpeWFkQGdtYWlsLmNvbSIsImlhdCI6MTc0NzMzNjM4Nn0.2z1lHDTF1dTPv_gqYCBbUbapq6-QH1_9cHgwY5Jx98A
    res.cookie("token" , token)               // eta ekon cookie hisabe patate hobe brouser e
    res.send("hocce")
})

// cookie er modde je token send hoisilo, seta teke main data { email: 'riyad@gmail.com', iat: 1747337235 }  decrept kora hoise
app.get("/read", (req,res)=>{
    let data= jwt.verify(req.cookies.token, "secret")
    console.log(data)
})

app.listen(3000, ()=>{
    console.log("server is running on http://localhost:3000")
})
