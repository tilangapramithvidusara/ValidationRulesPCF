import React from 'react';
import { Select } from 'antd';
import sampleInputQuestion from '../../SampleData/sampleInputQuestion';

interface SearchSortProps {
    sampleData: any[]; // Adjust the type/interface as needed
    onSelectItem: (selectedItem: string) => void;
    sampleQuestion: any
}
  
const SearchWithSort: React.FC<SearchSortProps> = ({sampleData, onSelectItem, sampleQuestion}) => {

    const searchFilterSort = (optionA: any, optionB: any) => {
        return (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase());
    }
        
    
    const searchFilterOption = (input: any, option: any) => {
        return (option?.label ?? '').includes(input)
    }
    
    const onChangeSearchEvent = (input: any, option: any) => {
        onSelectItem(option)
    }
    return (
        <div>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={searchFilterOption}
                filterSort={searchFilterSort}
                onChange={onChangeSearchEvent}
                options={sampleData}
                defaultValue={sampleQuestion}
            />
        </div>
    )
}

export default SearchWithSort;