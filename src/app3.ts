import { object } from 'underscore';
import Joi, { boolean } from 'joi';
import express from "express";
//-- data 
type courses = {
    id : number,
    name : string,
    available : boolean

} 
const javascript : courses ={
    id: 1,
    name: "javascript",
    available: true
}
const node : courses ={
    id: 2,
    name: "node",
    available: true
}
let allCourses : courses[]= [node,javascript];

// -- command
const app = express();
app.use(express.json())
app.get('/', (req , res)=>{
    res.send('hello world :) ')

});
app.get('/api/courses', (req , res)=> res.send([1,2,3]) );
app.get('/api/courses/:year/:month/:day', (req , res)=> res.send(req.params));
// read query
app.get('/api/name/:year/:month/:day', (req , res)=> res.send(req.query));
app.get('/api/c/:id',getCourse)
app.get('/api/c',(req , res)=> res.send(allCourses))

//-----
app.post('/api/add/c',addCourse)


//-----
app.put('/api/update/c/:id', updateCourse)

// --- 
app.delete('/api/delete/:id', deleteCourse)

///--  functions
function getCourse (req : express.Request, res : express.Response ): void {
    const course = findCourse(req,res);
    if (typeof course == 'object')
        res.send(course);
}

function addCourse(req : express.Request, res : express.Response ): void  {
    const schema = Joi.object({
        name : Joi.string().strict().trim().min(3).max(10).required()
    });

    
   const isValid = schema.validate(req.body)

    if (isValid.error){
        res.status(400).send(isValid.error.details[0].message);
        return;
    }
    const newCores: courses = {
        id: allCourses.length + 1,
        name: req.body.name,
        available: false
    };
    allCourses.push(newCores);
    res.send(newCores);

}

function updateCourse(req : express.Request, res : express.Response ): void {
   const course  = findCourse(req,res);
   if (typeof course == 'object')   {
    addCourse(req,res);
    course.name = req.body.name;
    res.send(course);
}
    

}
function deleteCourse(req : express.Request, res : express.Response ): void {
   const course = findCourse(req,res);
   if (typeof course == 'object'){
       const index : number = allCourses.indexOf(course);
       allCourses.splice(index, 1);
       res.send(course);

   }
    
}

function findCourse(req : express.Request, res : express.Response) : any | courses {
    const course = allCourses.find(c => c.id === parseInt(req.params.id));
    if (!course)
         return  res.status(404).send(`the course with id ${req.params.id} is not found`);
   else
        return course;

}






app.listen(3000,()=> 
    console.log('list on port 3000....')
    );

