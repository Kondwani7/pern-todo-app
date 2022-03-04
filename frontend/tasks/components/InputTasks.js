import React, { useState} from 'react'
import {Box, Container, HStack, Heading,
  
  Input,
  Button} from '@chakra-ui/react';
const InputTasks = () => {
    const [description, setDescription] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try{
            const body = {description}
            const response = await fetch("http://localhost:8000/tasks", {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(body)
            });
            console.log(response);
            window.location = "/";
        }catch(err){
            console.error(err.message);
        };
    }

  return (
        <Box mt="20" d="flex" alignItems="center">
            <Container maxWidth="container.xl">
                <Heading as="h2" size="xl" ml="80" mb="5">Input task</Heading>
                <form onSubmit={onSubmitForm}>
                    <HStack>
                        <Input 
                            type="text" 
                            value={description} 
                            placeholder='Task'
                            onChange={e => setDescription(e.target.value)}/>
                        <Button type="submit" colorScheme="green">Create Task</Button>
                    </HStack>
                </form>
            </Container>
    </Box>
  )
}

export default InputTasks