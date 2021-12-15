
// npm init --yes
//npm i express
//npm i nodemon
//npm i Joi@B.1.0





const JOI = require("joi"); 
const express = require("express"); 
const app = express();   
app.use(express.json())
const courses =[
    {id : 1, name:"course1"}, 
    {id : 2, name:"course2"}, 
    {id : 3, name:"course3"}
    
]


app.get('/',(req,res)=>{
    res.send(" home page");
})
// app.get('/api/courses/',(req,res ) =>{
//    res.send("hellow world"); 
// }) 
app.get('/api/courses',(req,res)=>{
    res.send(["couues1", "course2", "course3"])
}) 
app.get('/api/courses/:id',(req,res)=>{
    res.send(req.params.id); 
})
app.get('/api/courses/:id1/:id2',(req,res)=>{
    res.send(req.query);
})
app.post('/api/courses',(req, res)=>{ 

    const schema={
        name :JOI.string().min(3).required()
    } ; 
    
    const result =JOI.validate(req.body, schema) ;    
    if(result.error){
        res.status(400).send(result.error.details[0].message);  
        return ; 
    }


    const course ={
        name : req.body.name 
    };
    courses.push(course); // 


}) 

app.put("/api/courses/:id",(req, res)=>{
     const course = courses.find(c =>c.id ==parseInt(req.params.id)) 
     if(!course){
         res.status(404).send(" there is no course to update it "); 
         return ;
     }
     const schema={
         name : JOI.string().min(3).required()
     };

    const result = JOI.validate(req.body,schema);  
    if(result.error){

        res.send(result.error.details[0].message )
        return ; 
    } 

    // update 

    course.name = req.body.name ; 
    res.send(courses)
})
 const port = process.env.PORT ||3000; 

 app.delete("/api/courses/:id",(req,res)=>{
    const course = courses.find(c =>c.id ==parseInt(req.params.id)) 
    if(!course){
        res.status(404).send(" there is no course to update it "); 
        return ;
    } 
    index = courses.indexOf(course); 
    courses.splice(index,1); 
    res.send(courses); 

 }); 

app.listen(port,()=>{console.log(` i am listennig on port ${port}`)}) ; 