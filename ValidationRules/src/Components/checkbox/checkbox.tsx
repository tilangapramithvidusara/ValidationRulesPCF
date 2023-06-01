import React from 'react';
import { Checkbox, Col, Row } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';



interface checkBoxProps {
    setCheckboxValues: (selectedItem: CheckboxValueType[]) => void;
}

function CheckBox({
    setCheckboxValues,
}: checkBoxProps) {

    const onChange = (checkedValues: CheckboxValueType[]) => {
        setCheckboxValues(checkedValues)
        console.log('checked = ', checkedValues);
    };
    return (
        <Checkbox.Group style={{ width: '0%' }} onChange={onChange}>
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
    )
}

export default CheckBox;