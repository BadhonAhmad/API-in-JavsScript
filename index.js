import express from 'express';
import bodyParser from 'body-parser'
const app = express();
app.use(bodyParser.json());

const PORT = 8080;  
import userRoutes from './routes/users.js';

app.use('/users',userRoutes);
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})

//when we enter an url they send a get request default 
// app.get('/',(req, res) =>{
//     console.log("hello");
//     res.send('hello from home page');
// });

// app.post('/tshirt/:id',(req,res)=>{
//     const {id } = req.params;
//     const {logo} = "logoo";
//     if(!logo){
//         res.status(418).send({message : 'we need a logo'})
//     }
// })

