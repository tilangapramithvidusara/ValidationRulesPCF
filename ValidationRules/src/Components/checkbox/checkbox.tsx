import React from 'react';
import { Checkbox, Col, Row } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

interface CheckBoxProps {
  setCheckboxValues: (selectedItem: CheckboxValueType[]) => void;
    checkboxDefaultSelectedValues: any,
}

function CheckBox({
  setCheckboxValues,
    checkboxDefaultSelectedValues
}: CheckBoxProps) {
  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log("EFEFEFE", checkedValues);
    setCheckboxValues(checkedValues || []);
  };

  return (
    <Checkbox.Group
      style={{ display: 'block', marginBottom: '30px' }}
      onChange={onChange}
      className="actionWrap"
      defaultValue={checkboxDefaultSelectedValues}
    >
      
          <Checkbox value="disable"><span className='checkboxLabel'>Disable</span> </Checkbox>
      
          <Checkbox value="enable"><span className='checkboxLabel'>Enable</span> </Checkbox>
       
          <Checkbox value="hide"><span className='checkboxLabel'>Hide</span> </Checkbox>
        
          <Checkbox value="hideAndOutput"><span className='checkboxLabel'>Hide in output document</span> </Checkbox>
       
          <Checkbox value="show"><span className='checkboxLabel'>Show</span> </Checkbox>
       
          <Checkbox value="showAndOutput"><span className='checkboxLabel'>Show in output document</span> </Checkbox>
       
    </Checkbox.Group>
  );
}

export default CheckBox;
