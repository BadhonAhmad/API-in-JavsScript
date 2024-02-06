const express = require('express');
const app = express();
const PORT = 8080;  
app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:8080`);
})
app.use(express.json());

app.get('/tshirt',(req, res) =>{
    res.status(200).send({
        tshirt : "tshirt",
        size : 'large'
    })
});

app.post('/tshirt/:id',(req,res)=>{
    const {id } = req.params;
    const {logo} = "logoo";
    if(!logo){
        res.status(418).send({message : 'we need a logo'})
    }
})

