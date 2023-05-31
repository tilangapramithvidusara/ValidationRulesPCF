import React, { useEffect, useState } from 'react'
// import FieldInput from './Components/customField/FieldInput';
// import { sample_questions } from "./SampleData/sampleInputQuestion";
import SearchWithSort from '../../Components/searchWithSort/searchWithSort';
import DropDown from '../../Components/dropDown/dropDown';

import sampleInputQuestion from '../../SampleData/sampleInputQuestion';
import operationsSampleData from '../../SampleData/OperationsSampleData';
import expressionSampleData from '../../SampleData/expressionSampleData';
import showHideSampleData from '../../SampleData/showHideSampleData';
import { Button, Input, InputNumber } from 'antd';

interface Row {
    column1: string;
    column2: string;
    column3: string;
    column4: string;
    column5: string;
    column6: string;
}
  
interface TableRowProps {
    row: Row;
    index: number;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, index: number, column: keyof Row) => void;
    onQuestionChanged: (selectedItem: string) => void;
    onExpressionChanged: (selectedItem: string) => void;
    onAnswerTypeChanged: (selectedItem: string) => void;
    onShowHideChanged: (selectedItem: string) => void;
    onOperationChanged: (selectedItem: string) => void;
}
  
function TableRow({
    row,
    index,
    onQuestionChanged,
    onExpressionChanged,
    onAnswerTypeChanged,
    onShowHideChanged,
    onOperationChanged,
    handleInputChange
}: TableRowProps) {

  const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null);
  const [selectedExpression, setSelectedExpression] = useState<any | null>(null);
  const [selectedAnswerType, setSelectedAnswerType] = useState<any | null>(null);
  const [selectedOperations, setSelectedOperations] = useState<any | null>(null);
  const [selectedShowHide, setSelectedShowHide] = useState<any | null>(null);

  useEffect(() => {
    if (selectedQuestion) onQuestionChanged(selectedQuestion?.value);
  }, [selectedQuestion])

  useEffect(() => {
    if (selectedExpression) onExpressionChanged(selectedExpression?.value);
  }, [selectedExpression])

  useEffect(() => {
    if (selectedAnswerType) onAnswerTypeChanged(selectedAnswerType?.value);
  }, [selectedAnswerType])

  useEffect(() => {
    if (selectedOperations) onOperationChanged(selectedOperations?.value);
  }, [selectedOperations])

  useEffect(() => {
    if (selectedShowHide) onShowHideChanged(selectedShowHide?.value);
  }, [selectedShowHide])

  const handleInputTextChanged = (value: any) => {
    onAnswerTypeChanged(value)
  }
    
    const handleOnClick = (values: any) => {
        console.log("ROWSSS", row)
        console.log("ROWSSS values", values)
        handleInputChange(values, index, 'column1')
    }
  return (
    <tr>
      <td>
        <SearchWithSort
          sampleData={sampleInputQuestion}
          onSelectItem={setSelectedQuestion}
        />
      </td>
      <td>
        <DropDown
          sampleData={expressionSampleData}
          onSelectItem={setSelectedExpression}
        />
      </td>
      <td>
        {
          selectedQuestion && selectedQuestion?.questionType === 'text' ?
            <Input onChange={(value) => handleInputTextChanged(value) } /> :
            selectedQuestion && selectedQuestion?.questionType === 'numeric' ?
              <InputNumber onChange={(value) => handleInputTextChanged(value) } /> :
              <DropDown
                sampleData={expressionSampleData}
                onSelectItem={setSelectedAnswerType}
              />
        }
      </td>
      <td>
        <DropDown sampleData={showHideSampleData} onSelectItem={setSelectedShowHide} />
      </td>
      <td>
        <DropDown sampleData={operationsSampleData} onSelectItem={setSelectedOperations} />
          </td>
          <td>
        <Button onClick={handleOnClick}> Add </Button>
      </td>
    </tr>
  );
}

export default TableRow;