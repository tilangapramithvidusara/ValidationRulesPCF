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
  checkboxValuesFromConfig
}: CheckBoxProps) {
  const onChange = (checkedValues: CheckboxValueType[]) => {
    setCheckboxValues(checkedValues || []);
  };

  useEffect(() => {
    console.log("checkboxValuesFromConfig", checkboxValuesFromConfig)
  }, [checkboxValuesFromConfig])

  return (
    <Checkbox.Group
      style={{ width: '57%', display: 'inline', padding: '2%' }}
      onChange={onChange}
      defaultValue={checkboxDefaultSelectedValues}
    >
      {
        checkboxValuesFromConfig && checkboxValuesFromConfig.length && checkboxValuesFromConfig.map((configAction: any) => (
          <Row>
            <Col span={8}>
              <Checkbox value={configAction.value}> {configAction.displayName}</Checkbox>
            </Col>
        </Row>
        ))
      }
    </Checkbox.Group>
  );
}

export default CheckBox;
