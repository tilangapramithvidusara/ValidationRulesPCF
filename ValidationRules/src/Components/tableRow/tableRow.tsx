import React, { useEffect, useState } from 'react'
// import FieldInput from './Components/customField/FieldInput';
// import { sample_questions } from "./SampleData/sampleInputQuestion";
import SearchWithSort from '../../Components/searchWithSort/searchWithSort';
import DropDown from '../../Components/dropDown/dropDown';

import sampleInputQuestion from '../../SampleData/sampleInputQuestion';
import operationsSampleData from '../../SampleData/OperationsSampleData';
import expressionSampleData from '../../SampleData/expressionSampleData';
import { Button, Input, InputNumber, Checkbox } from 'antd';

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
    handleInputChange: (index: number, column: any) => void;
    onQuestionChanged: (selectedItem: string) => void;
    onExpressionChanged: (selectedItem: string) => void;
    onAnswerTypeChanged: (selectedItem: string) => void;
    onShowHideChanged: (selectedItem: string) => void;
    onOperationChanged: (selectedItem: string) => void;
    handleDeleteRow: (index: number) => void;
    handleCheckboxClick: (index: number) => void;
    setRowKey: any,
    sampleObjData: any
}

function TableRow({
    row,
    index,
    onQuestionChanged,
    onExpressionChanged,
    onAnswerTypeChanged,
    onShowHideChanged,
    onOperationChanged,
    handleInputChange,
    handleDeleteRow,
    handleCheckboxClick,
    setRowKey,
    sampleObjData
}: TableRowProps) {

    const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null);
    const [selectedExpression, setSelectedExpression] = useState<any | null>(null);
    const [selectedAnswerType, setSelectedAnswerType] = useState<any | null>(null);
    const [selectedOperations, setSelectedOperations] = useState<any | null>(null);
    const [selectedShowHide, setSelectedShowHide] = useState<any | null>(null);
    const [inputvalue, setInputvalue] = useState<any | null>(null);

    useEffect(() => {
        if (selectedQuestion) onQuestionChanged(selectedQuestion?.value);
        console.log("selectedQuestionselectedQuestion", selectedQuestion)
        handleInputChange(index, { question: selectedQuestion?.value })
    }, [selectedQuestion])

    useEffect(() => {
        if (selectedExpression) onExpressionChanged(selectedExpression?.value);
        handleInputChange(index, { expression: selectedExpression?.value })
    }, [selectedExpression])

    useEffect(() => {
        if (selectedAnswerType) onAnswerTypeChanged(selectedAnswerType?.value);
        handleInputChange(index, { answerType: selectedAnswerType?.value })
    }, [selectedAnswerType])

    useEffect(() => {
        if (selectedOperations) onOperationChanged(selectedOperations?.value);
        handleInputChange(index, { operation: selectedOperations?.value })
        
    }, [selectedOperations])

    useEffect(() => {
        if (selectedShowHide) onShowHideChanged(selectedShowHide?.value);
        handleInputChange(index, { showhide: selectedShowHide?.value })
       
    }, [selectedShowHide])

    const handleInputTextChanged = (value: any) => {
        onAnswerTypeChanged(value)
        handleInputChange(index, { answerType: value })
    }

    useEffect(() => {
        onAnswerTypeChanged(inputvalue)
        handleInputChange(index, { answerType: inputvalue })
    }, [inputvalue])
    
    return (
        <tr>
            <td>
                <Checkbox value={index} onClick={() => handleCheckboxClick(index)} />
            </td>
            {
                index !== 1 ? (
                    <td>
                        <DropDown
                            sampleData={operationsSampleData}
                            onSelectItem={setSelectedOperations}
                            selectedValue={sampleObjData?.Operator || ""}
                        />
                    </td>
                ) :
                    <td>

                    </td>
            }
            <td>
                <SearchWithSort
                    sampleData={sampleInputQuestion}
                    onSelectItem={setSelectedQuestion}
                    selectedValue={sampleObjData?.Field || ""}
                />
            </td>
            <td>
                <DropDown
                    sampleData={expressionSampleData}
                    onSelectItem={setSelectedExpression}
                    selectedValue={sampleObjData?.expression || ""}
                />
            </td>
            <td>
                {
                    selectedQuestion && selectedQuestion?.questionType === 'text' ?
                        <Input value={inputvalue} onChange={(e) => setInputvalue(e.target.value)} defaultValue={sampleObjData?.Value}/> :
                        selectedQuestion && selectedQuestion?.questionType === 'numeric' ?
                            <InputNumber onChange={(value) => handleInputTextChanged(value)} /> :
                            <DropDown
                                sampleData={expressionSampleData}
                                onSelectItem={setSelectedAnswerType}
                                selectedValue={sampleObjData?.Value || ""}
                            />
                }
            </td>
            <td>
                <Button onClick={() => handleDeleteRow(index)}> RemoveRow </Button>
            </td>
        </tr>
    );
}

export default TableRow;