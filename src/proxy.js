const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()

app.use(cors({
    origin: '*'
}))

app.use(express.json())

app.post('/', async(req, res)=>{
    const data = await req.body
    console.log(req.body)
    var config = {
        method: 'post',
        url: 'https://codexweb.netlify.app/.netlify/functions/enforceCode',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
          console.log(response.data)
        return res.json(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
})

app.listen(8000)