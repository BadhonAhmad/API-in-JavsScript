const express = require('express');
const {itemsClear,createItem, readItems, updateItem, deleteItem,getItemSingle} = require('./crud');

const app = express();
const Joi = require('joi');
app.use(express.json());


app.get('/itemsClear',(req,res) =>{
    itemsClear((err) =>{
        if(err){
            res.status(500).send(err.message);
        }
        else{
            res.status(200).send("no database");
        }
    })
})

app.get('/items', (req,res)=> {
    readItems((err, rows) =>{
        if(err){
            res.status(500).send(err.message)
        }
        else{
            res.status(200).json(rows);
        }
    })
});

app.get('/item/:id', (req, res) => {
    const id=req.params.id;
    getItemSingle(id,(err,rows) => {
        if(err){
            res.status(500).send(err.message);
        }
        else{
            res.status(200).json(rows);
        }
    });
});



app.post('/items',(req, res) =>{
    const {name, description} = req.body
    createItem(name , description , (err, data) =>{
        if(err){
            res.status(500).send(err.message);            
        }else{
            res.status(201).send(`Item is added ID : ${data.id}`)
        }
    })
})

app.put('/items/:id',(req,res)=>{
    const {name, description} = req.body;
    updateItem(req.params.id,name,description,(err)=>{
        if(err){
            res.status(500).send(err.message);  
        }
        else{
            res.status(200).send("Item Updated");
        }
    })
})


app.delete('/items/:id',(req,res) =>{
    deleteItem(req.params.id,(err)=>{
        if(err){
            res.status(500).send(err.message);
        }
        else{
            res.status(200).send("item deleted");
        }
    })
})


///another api's
const courses = [
    {id : 1, name : 'course1'},
    {id : 2, name : 'course2'},
    {id : 3, name : 'course3'}
]


app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
      // Handle the case where the course is not found
      res.status(404).send('Course not found');
    } else {
      res.send(course);
    }
});


app.get('/api/courses/:year/:month/',(req,res)=>{
    res.send(req.query);
});// /api/courses/2018/1


app.get('/api/courses',(req,res) =>{
    res.send(courses);
});


app.post('/api/courses', async (req, res) => {
    try {
        const result = await validateCourse(req.body);
        const course = {
            id: courses.length + 1,
            name: result.name
        };
        courses.push(course);
        res.send(course);
    }
    catch (error) {
        res.status(400).send(error.details[0].message);
    }
});


app.put('/api/courses/:id', async(req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
       return res.status(404).send('The course with given id is not found');
    }
    try{
        const result = await validateCourse(req.body);
        course.name = req.body.name;
        res.send(course);
    }
    catch(error){
        res.status(400).send(error.details[0].message);
    }
});


app.delete('/api/courses/:id',(req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        return res.status(404).send("The course was not found");
    }
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});


const port = process.env.PORT || 5000;
app.listen(port,()=> console.log(`listening to port ${port}`));


function validateCourse(course){
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });
    return schema.validateAsync(course);
}