import React, { useState} from 'react'
import {Box, Container, Link, HStack, Stack, Select, Heading, Input,Button, VStack, Checkbox, CheckboxGroup} from '@chakra-ui/react';
const InputTasks = () => {
    const [fullname, setFullname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [jobPosition, setJobPosition] = useState("");
    const [organisation, setOrganisation] = useState("");
    const [bankName, setBankName] = useState("");
    const [bankBranch, setBankBranch] = useState("");
    const [bankAccountNumber, setBankAccountNumber] = useState("");
    const [identityType, setIdentityType] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try{
            const body = {fullname, phoneNumber, jobPosition, bankName, bankAccountNumber, organisation, identityType}
            const response = await fetch("http://localhost:8000/brand_evangelists", {
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
            <Container maxWidth="container.lg">
                <Heading as="h2" size="xl" ml="80" mb="5">Register as a brand Evangelist</Heading>
                <form onSubmit={onSubmitForm}>
                    <Stack spacing="20px">
                        <Input 
                            type="text" 
                            value={fullname} 
                            placeholder='Full name'
                            onChange={e => setFullname(e.target.value)}/>
                        <Input 
                            type="text" 
                            value={phoneNumber} 
                            placeholder='Phone Number'
                            onChange={e => setPhoneNumber(e.target.value)}/> 
                        <Input 
                            type="text" 
                            value={identityType} 
                            placeholder='Identity type NRC or Passport'
                            onChange={e => setIdentityType(e.target.value)}/> 
                        <Input 
                            type="text" 
                            value={organisation} 
                            placeholder='Organisation'
                            onChange={e => setOrganisation(e.target.value)}/>
                        <Input 
                            type="text" 
                            value={jobPosition} 
                            placeholder='Job Role/Position'
                            onChange={e => setJobPosition(e.target.value)}/>   
                        <Input 
                            type="text" 
                            value={bankName} 
                            placeholder='Name of your Bank'
                            onChange={e => setBankName(e.target.value)}/> 
                        <Input 
                            type="text" 
                            value={bankBranch} 
                            placeholder='Bank Branch'
                            onChange={e => setBankBranch(e.target.value)}/> 
                        <Input 
                            type="text" 
                            value={bankAccountNumber} 
                            placeholder='Bank Account Number'
                            onChange={e => setBankAccountNumber(e.target.value)}/> 
                        <Checkbox>
                            do you consent to Our <Link color='teal.500' href="">Terms and conditions</Link>
                        </Checkbox>
                        {/* use it when creating a referral
                        <CheckboxGroup>
                            <Checkbox value=''>
                                data center
                            </Checkbox>
                            <Checkbox value=''>
                                cloud service
                            </Checkbox>
                        </CheckboxGroup>*/}        
                        <Button type="submit" colorScheme="blue">Register</Button>
                    </Stack>
                </form>
            </Container>
    </Box>
  )
}

export default InputTasks