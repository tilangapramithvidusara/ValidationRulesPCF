import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { expressionSampleData } from "../../SampleData/expressionSampleData";
import sample_questions from "../../SampleData/sampleInputQuestion";

const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};
interface FieldInputprops {
    itemsList: any;
  }
  
  function FieldInput({
      itemsList
  }: FieldInputprops) {
    const [items, setItems] = useState<any[]>([]);
    useEffect(() => {
        setItems(itemsList)
    }, [itemsList])
    return (
        <div>
            <Select
                defaultValue="Chapter 01"
                style={{ width: 200 }}
                onChange={handleChange}
                options={items}

            />
            {/* <Select
                showSearch
                style={{
                    width: 200,
                }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={expressionSampleData}
            /> */}
        </div>

    )
}

export default FieldInput;