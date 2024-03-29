import React, { useEffect } from 'react';
import { Checkbox, Col, Row } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

interface CheckBoxProps {
  setCheckboxValues: (selectedItem: CheckboxValueType[]) => void;
  checkboxDefaultSelectedValues: any,
  checkboxValuesFromConfig: any
}

function CheckBox({
  setCheckboxValues,
  checkboxDefaultSelectedValues,
  checkboxValuesFromConfig,
}: CheckBoxProps) {
  const onChange = (checkedValues: CheckboxValueType[]) => {
    setCheckboxValues(checkedValues || []);
  };

  useEffect(() => {
    console.log("checkboxValuesFromConfig", checkboxValuesFromConfig)
  }, [checkboxValuesFromConfig])

  return (
   <>
      {
        checkboxValuesFromConfig && checkboxValuesFromConfig.length > 0 && checkboxValuesFromConfig.map((configAction: any) => (
          <Checkbox.Group
          style={{ display: 'block', marginBottom: '10px' }}
          onChange={onChange}
          className="actionWrap"
          defaultValue={checkboxDefaultSelectedValues}
        >
          <Row>
            <Col span={8}>
              <Checkbox value={configAction.value}>{configAction?.displayName && <span className='checkboxLabel'>{configAction?.displayName}</span>} </Checkbox>
            </Col>
          </Row>
          
          </Checkbox.Group>
        ))
      }
      
          {/* <Checkbox value="disable"><span className='checkboxLabel'>Disable</span> </Checkbox>
      
          <Checkbox value="enable"><span className='checkboxLabel'>Enable</span> </Checkbox>
       
          <Checkbox value="hide"><span className='checkboxLabel'>Hide</span> </Checkbox>
        
          <Checkbox value="hideAndOutput"><span className='checkboxLabel'>Hide in output document</span> </Checkbox>
       
          <Checkbox value="show"><span className='checkboxLabel'>Show</span> </Checkbox>
       
          <Checkbox value="showAndOutput"><span className='checkboxLabel'>Show in output document</span> </Checkbox> */}
       
       </>
  );
}

export default CheckBox;
