import React, {Fragment,useState} from 'react'
import {Button, Input, InputRightAddon, InputGroup, HStack} from '@chakra-ui/react';

const EditTask = ({brand_evangelists}) => {
    const [dealValue, setDealValue] = useState(brand_evangelists.deal_value);
    //edit dealValue
    const updateDealValue = async e => {
        e.preventDefault();
        try{
            const body = {dealValue};
            const response  = await fetch(`http://localhost:8000/brand_evangelists/${brand_evangelists.brand_evangelist_id}`,{
                method:"PUT",
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
        id={`id${brand_evangelists.brand_evangelist_id}`}
        onClick={() => setDealValue(brand_evangelists.deal_value)}
      >
              <HStack>
                    <Input
                        type="text"
                        className="form-control"
                        htmlSize={5}
                        value={dealValue}
                        onChange={(e)=>setDealValue(e.target.value) }
                    />
                <Button
                    mt="2"
                    type="button"
                    className="btn btn-warning"
                    data-dismiss="modal"
                    colorScheme="blue"
                    onClick={e => updateDealValue(e)}
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
                onClick={() => setDealValue(brand_evangelists.deal_value)}
              >
                Close
              </Button>
              </HStack>
      </div>
    </Fragment>
  )
}

export default EditTask
