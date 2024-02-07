const express = require('express');
const app = express();
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

const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`listening to port ${port}`));

