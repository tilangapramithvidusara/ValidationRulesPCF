import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { expressionSampleData } from "../../SampleData/expressionSampleData";
import sample_questions from "../../SampleData/sampleInputQuestion";

interface SearchSortProps {
    fieldOutputData: any[];
}
  
const DisplayText: React.FC<SearchSortProps> = ({fieldOutputData}) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
    return (
        <div>
            <div>
                Display Text :
            </div>
        </div>

    )
}

export default DisplayText;