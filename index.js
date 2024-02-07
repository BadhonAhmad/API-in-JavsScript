const express = require('express');
const app = express();
const Joi = require('joi');
app.use(express.json());
const courses = [
    {id : 1, name : 'course1'},
    {id : 2, name : 'course2'},
    {id : 3, name : 'course3'}
]

app.get('/', (req,res)=> {
    res.send("hello badhon");
});

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

app.post('/api/courses', async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    try {
        const result = await schema.validateAsync(req.body);
        const course = {
            id: courses.length + 1,
            name: result.name
        };
        courses.push(course);
        res.send(course);
    } catch (error) {
        res.status(400).send(error.details[0].message);
    }
});


const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`listening to port ${port}`));

