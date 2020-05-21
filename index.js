const express=require('express');
const bodyParser=require('body-parser');
const app= express();

const id={
username: 'password'
}

const port=process.env.PORT || 2018;

app.use(bodyParser.json());

app.listen(2018, ()=> console.log('running at 2018'));

app.post('*',(req,res)=>{
const {username, password}= req.body;
console.log('yo');
console.log(req.body);
if(!username || !password) return res.status(400).send('bad request');
if(!id[username]) return res.status(403).send('incorrect username or password');
if(id[username]!=password) return res.status(403).send('incorrect password');
return res.status(200).send();
})

app.get('/', function (req, res) {
  res.send('Hello World')
})

//app.post('/', function (req, res) {
//   console.log("Got a POST request for the homepage");
//   res.send('Hello POST');
//})

app.use((req,res,next)=> {
const err=new Error('Not FounD')
err.status=404;
next(err);
})

app.use((err,req,res,next)=>res.status(err.status||500).send(err.message || 'an error occured'));

