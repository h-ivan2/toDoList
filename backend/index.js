const express=require('express')
const app=express();
const path=require('path')
const PORT=9000;

app.use(express.json());
app.use(express.static(path.join(__dirname,"..","Frontend")));

let tasks=[];

app.get('/tasks' ,(req,res) =>{
    res.json(tasks);
})

app.post("/tasks" ,(req,res)=>{
    const task =req.body.task;

    if(task){
        tasks.push({id:Date.now(), task, completed: false});
        res.status(201).json({message:"Task added"});
    }else{
        res.status(400).json({message:"Task cannot be empty"});
    }
})

app.delete("/tasks/:id" , (req,res)=>{
  const id=parseInt(req.params.id);
  tasks=tasks.filter(t=>t.id !== id);
  res.json({message:"Task deleted"});
});

app.listen(PORT,"0.0.0.0" ,() =>{
console.log(`Server is running on port ${PORT}`)
});


//