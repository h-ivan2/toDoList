const TaskInput=document.getElementById("taskInput");
const addBtn=document.getElementById("addBtn")
const taskList=document.getElementById("taskList");

async function fetchTasks(){
    const res=await fetch("/tasks")
    const tasks=await res.json();
    taskList.innerHTML="";
    tasks.forEach(t=> {
        const li =document.createElement("li")
        li.textContent=t.task;
        const delBtn=document.createElement("button");
        delBtn.textContent="Delete";
        delBtn.onclick =async ()=>{
            await fetch(`/tasks/${t.id} `, {method: "DELETE"});
            fetchTasks();
        };
        li.appendChild(delBtn)
        taskList.appendChild(li);
    });
    
}

addBtn.onclick =async () =>{
    const task =taskInput.value;
    if(task){
        await fetch("/tasks" ,{
            method: "POST" ,
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({task})
        });
        TaskInput.value="";
        fetchTasks();
    }
};

fetchTasks();