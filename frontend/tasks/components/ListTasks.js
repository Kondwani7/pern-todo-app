import React, {useState, useEffect} from 'react'
import {Box, Container, Heading, Table,Thead,Tbody, Tr, Th, Td, Button} from '@chakra-ui/react';
import EditTask from './EditTask';

const ListTasks = () => {
    const [brand_evangelists, setBrandEvangelists] = useState([]);


    const getbrandEvangelists = async() => {
        try{
            const response = await fetch("http://localhost:8000/brand_evangelists")
            const jsonData = await response.json();

            setBrandEvangelists(jsonData);
        }catch(err){
            console.error(err.message)
        }
    }

    const deleteTask = async id => {
        try{
            const delBrandEvangelists = await fetch(`http://http://localhost:8000/brand_evangelists/${id}`, {
                method:"DELETE"
            });
            
            setBrandEvangelists(brand_evangelists.filter(brand_evangelist => brand_evangelist.brand_evangelist_id !== id));
        }catch(err){
            console.error(err.message)
        }
    }

    useEffect(()=> {
        getbrandEvangelists();
    }, [])

    console.log(getbrandEvangelists);

  return (
      
    <Box  d="flex" alignItems="center" mt="16">
        <Container maxW="container.xl">
            <Heading as="h2" size="xl" mb="3" ml={80}>List of Brand Evangelists</Heading>
            <Table colorScheme="gray" size="sm">
                <Thead>
                    <Tr>
                        <Th>Brand Evangelist Id</Th>
                        <Th>Full name</Th>
                    
                        <Th>Deal Completed?</Th>
                        <Th>Deal value (ZMK)</Th>
                        <Th color="#181fde">Edit Deal Value</Th>
                        <Th>Delete Brand evangelist</Th>
                        <Th>Test Reward (ZMK)</Th>
                        <Th>Reward (ZMK)</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {brand_evangelists.map(brand_evangelist =>(
                        <Tr key={brand_evangelist.brand_evangelist_id}>
                            <Td>{brand_evangelist.brand_evangelist_id}</Td>
                            <Td>{brand_evangelist.fullname}</Td>
                            <Td>{brand_evangelist.deal_completed}</Td>
                            <Td>{brand_evangelist.deal_value}</Td>
                            <Td >
                                <EditTask brand_evangelists={brand_evangelists}/>
                            </Td>                
                            <Td>
                                <Button 
                                    onClick={()=> deleteTask(brand_evangelist.brand_evangelist_id)}
                                    colorScheme="red"
                                >
                                 Delete   
                                </Button>
                            </Td>
                            <Td deal_completed>
                                {brand_evangelist.deal_value < 10000 ? 0 : brand_evangelist.deal_value * .075}
                            </Td>
                            <Td>{brand_evangelist.reward}</Td>
                        </Tr>
                    ) )}
                </Tbody>
            </Table>
        </Container>
    </Box>
  )
}

export default ListTasks