import React from 'react';
import { Checkbox, Col, Row } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

interface CheckBoxProps {
  setCheckboxValues: (selectedItem: CheckboxValueType[]) => void;
    onChange: any;
    checkboxDefaultSelectedValues: any,
}

function CheckBox({
  setCheckboxValues,
    onChange,
    checkboxDefaultSelectedValues
}: CheckBoxProps) {
  onChange = (checkedValues: CheckboxValueType[]) => {
    console.log("EFEFEFE", checkedValues);
    setCheckboxValues(checkedValues);
  };

  return (
    <Checkbox.Group
      style={{ width: '57%', display: 'inline', padding: '2%' }}
      onChange={onChange}
      defaultValue={checkboxDefaultSelectedValues}
    >
      <Row>
        <Col span={8}>
          <Checkbox value="disable"> Disable</Checkbox>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Checkbox value="enable">Enable</Checkbox>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Checkbox value="hide">Hide</Checkbox>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Checkbox value="hideAndOutput">Hide in output document</Checkbox>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Checkbox value="show">Show</Checkbox>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Checkbox value="showAndOutput">Show in output document</Checkbox>
        </Col>
      </Row>
    </Checkbox.Group>
  );
}

export default CheckBox;
