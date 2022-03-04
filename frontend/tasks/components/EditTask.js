import React, {Fragment,useState} from 'react'
import {Button, Input, InputRightAddon, InputGroup, HStack} from '@chakra-ui/react';

const EditTask = ({task}) => {
    const [description, setDescription] = useState(task.description)
    //edit description
    const updateDescription = async e => {
        e.preventDefault();
        try{
            const body = {description};
            const response  = await fetch(`http://localhost:8000/tasks/${task.task_id}`,{
                method:"PATCH",
                headers:{"Content-type":"application/json"},
                body: JSON.stringify(body)
            });

            window.location = "/";
        }catch(err){
            console.error(err.message)
        }
    }
  return (
     <Fragment>
      <div
        className="modal"
        id={`id${task.task_id}`}
        onClick={() => setDescription(task.description)}
      >
              <HStack>
                    <Input
                        type="text"
                        className="form-control"
                        value={description}
                        htmlSize={5}
                        onChange={e => setDescription(e.target.value)}
                    />
                <Button
                    mt="2"
                    type="button"
                    className="btn btn-warning"
                    data-dismiss="modal"
                    colorScheme="blue"
                    onClick={e => updateDescription(e)}
                >
                Update
              </Button>
              <Button
                colorScheme="blackAlpha"
                mt="2"
                ml="3"
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setDescription(task.description)}
              >
                Close
              </Button>
              </HStack>
      </div>
    </Fragment>
  )
}

export default EditTask