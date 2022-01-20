const bodyParser = require('body-parser');
const { collection, getDocs, addDoc } = require('firebase/firestore');
const express = require('express');
const db = require('./config');
const app = express();
app.use(bodyParser.json());
app.post('/', async(req, res) => {
    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;
    const port = req.headers.host;
    const fullUrl = `${protocol}://${port}${url}`;
    const querySnapshot = await getDocs(collection(db, "users"));
    var exist = false;
    querySnapshot.forEach((doc) => {
        if(doc.data().url == req.body.url)
        {
             res.send(`${fullUrl}?idx=${doc.data().idx}`);
             exist = true;
        }
    });
    if(!exist){
        let len = querySnapshot.size;
    const docRef = await addDoc(collection(db, "users"), {
        idx: len,
        url: req.body.url
      })
    const temp = `${fullUrl}?idx=${len}`;
    res.send(temp);
    }
})
app.get('/notfound',(req,res)=>{
    res.send("URL is not shotened by us, kindly use our API to shorten URL then use search thorugh our shortened URL");
})
app.get('/',async(req,res)=>{
    var found = false;
    var urlFinal = '';
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
    if(doc.data().idx == req.query.idx)
    {
        found = true;
        urlFinal = doc.data().url; 
    }
});
    if(!found)
    res.redirect("/notfound");
    else
    res.redirect(urlFinal);
   
})
app.listen(process.env.PORT || 3000, (err, res) => {
    console.log("server started");
})