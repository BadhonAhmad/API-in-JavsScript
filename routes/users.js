import express from 'express';
const router = express.Router();
const users = [
    {
        firstName : "john",
        lastName : "doe",
        age : 24
    },
    {
        firstName : "jane",
        lastName : "doe",
        age : 32
    }
]


router.get('/',(req,res) =>{
   console.log(users);
    res.send(users);
});

router.post('/',(req,res) =>{
   console.log('POST req reached');
   console.log(req.body)
    res.send('Post req reached');
});


export default router;