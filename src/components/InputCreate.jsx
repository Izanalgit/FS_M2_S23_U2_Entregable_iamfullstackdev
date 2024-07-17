import { useState, useEffect } from "react";

const InputCreate = () => {
    const [input, setInput] = useState("");
    const [newTask, setNewTask] = useState("");
    const [status, setStatus] = useState(false);
    const endpointApi = 'http://localhost:3000/create';

    const postConfig = {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title:newTask})
    }
    
    const sendTask = async () => {
        try {
            const response = await fetch(endpointApi,postConfig);
            if(response) setStatus(true);
        } catch (error) {
            console.log(error)
        }
    }
    const handleChange = (e) =>{
        setInput(e.target.value);
        setStatus(false);
    }

    const handleSubmit = () => {
        setNewTask(input);
        setInput("");
    }

    useEffect(()=>{
        if(newTask)sendTask();
    },[newTask])

    return (
        <>  
            {!status && <h3>Añade una nueva tarea a la lista.</h3>}
            {status && <h3>Nueva tarea creada !</h3>}
            <input 
                name="newTask" 
                value={input} 
                title="Nueva tarea..." 
                onChange={e=>handleChange(e)} 
            />
            <button onClick={handleSubmit}>Enviar</button>
        </>
    );
}

export default InputCreate;