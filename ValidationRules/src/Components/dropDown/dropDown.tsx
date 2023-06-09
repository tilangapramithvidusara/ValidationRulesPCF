import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { expressionSampleData } from "../../SampleData/expressionSampleData";
import sample_questions from "../../SampleData/sampleInputQuestion";

interface SearchSortProps {
    sampleData: any[];
    onSelectItem: (selectedItem: string) => void;
    selectedValue: any
}
  
const FieldInput: React.FC<SearchSortProps> = ({sampleData, onSelectItem, selectedValue}) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    useEffect(() => {
        console.log(sampleData)
    })
    return (
        <div>
            <Select
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
                onChange={(input, option) => onSelectItem(option)}
                options={sampleData}
                defaultValue={selectedValue}
            />
        </div>

    )
}

export default FieldInput;