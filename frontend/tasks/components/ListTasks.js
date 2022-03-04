import React, {useState, useEffect} from 'react'
import {Box, Container, Heading, Table,Thead,Tbody, Tr, Th, Td, Button} from '@chakra-ui/react';
import EditTask from './EditTask';

const ListTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [display, changeDisplay] = useState('hide')


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
            const delTask = await fetch  (`http://localhost:8000/tasks/${id}`, {
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

    const dealValue = 15000.00

    console.log(getTasks);

  return (
      
    <Box  d="flex" alignItems="center" mt="16">
        <Container maxW="container.xl">
            <Heading as="h2" size="xl" mb="3" ml={80}>List of Tasks</Heading>
            <Table colorScheme="gray" size="sm">
                <Thead>
                    <Tr>
                        <Th>Task Id</Th>
                        <Th>Description</Th>
                        <Th color="#181fde">Edit Description</Th>
                        <Th>Delete Task</Th>
                        <Th>Numeric value</Th>
                        <Th>Reward</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {tasks.map(task =>(
                        <Tr key={task.task_id}>
                            <Td>{task.task_id}</Td>
                            <Td>{task.description}</Td>
                            <Td >
                                <EditTask task={task}/>
                            </Td>
                            <Td>
                                <Button 
                                    onClick={()=> deleteTask(task.task_id)}
                                    colorScheme="red"
                                >
                                 Delete   
                                </Button>
                            </Td>
                            <Td isNumeric>{dealValue}</Td>
                            <Td isNumeric>
                                {dealValue < 9999.99 ? 0 : dealValue * .075}</Td>
                        </Tr>
                    ) )}
                </Tbody>
            </Table>
        </Container>
    </Box>
  )
}

export default ListTasks