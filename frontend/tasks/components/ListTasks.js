import React, {useState, useEffect} from 'react'
import {Box, Container, Heading, Table,Thead,Tbody, Tr, Th, Button} from '@chakra-ui/react';

const ListTasks = () => {
    const [tasks, setTasks] = useState([]);

    const getTasks = async() => {
        try{
            const response = await fetch("http://localhost:8000/tasks")
            const jsonData = await response.json();

            setTasks(jsonData);
        }catch(err){
            console.error(err.message)
        }
    }

    const deleteTask = async id => {
        try{
            const deleteTodo = await fetch  (`http://localhost:8000/tasks/${id}`, {
                method:"DELETE"
            });
            
            setTasks(tasks.filter(task => task.task_id !== id));
        }catch(err){
            console.error(err.message)
        }
    }

    useEffect(()=> {
        getTasks();
    }, [])

    console.log(getTasks);

  return (
    <Box  d="flex" alignItems="center" mt="16">
        <Container maxW="container.xl">
            <Heading as="h2" size="xl" mb="3" ml={80}>List of Tasks</Heading>
            <Table colorScheme="gray">
                <Thead>
                    <Tr>
                        <Th>Task Id</Th>
                        <Th>Description</Th>
                        <Th>Delete Task</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {tasks.map(task =>(
                        <Tr key={task.task_id}>
                            <Th>{task.task_id}</Th>
                            <Th>{task.description}</Th>
                            <Th>
                                <Button 
                                    onClick={()=> deleteTask(task.task_id)}
                                    colorScheme="red"
                                >
                                 Delete   
                                </Button>
                            </Th>
                        </Tr>
                    ) )}
                </Tbody>
            </Table>
        </Container>
    </Box>
  )
}

export default ListTasks