import React, { useEffect, useState } from 'react'
// import FieldInput from './Components/customField/FieldInput';
// import { sample_questions } from "./SampleData/sampleInputQuestion";
import SearchWithSort from './Components/searchWithSort/searchWithSort';
import DropDown from './Components/dropDown/dropDown';
import TableRow from './Components/tableRow/tableRow';

import sampleInputQuestion from './SampleData/sampleInputQuestion';
import operationsSampleData from './SampleData/OperationsSampleData';
import expressionSampleData from './SampleData/expressionSampleData';
import showHideSampleData from './SampleData/showHideSampleData';

import { Button, Input, InputNumber } from 'antd';

interface Row {
  column1: string;
  column2: string;
  column3: string;
  column4: string;
  column5: string;
  column6: string;
}

interface Item {
  index: number;
  question: any;
  expression: any;
  operation: any;
  showhide: any;
  answerType: any;
}

export default function App() {
  // const props = { requiredProp: "bar" };
  const [rows, setRows] = useState<Row[]>([{
    column1: '',
    column2: '',
    column3: '',
    column4: '',
    column5: '',
    column6: ''
  }]);
  const [question, setQuestion] = useState<string | null>(null);
  const [expression, setExpression] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [showhide, setShowHide] = useState<string | null>(null);
  const [answerType, setAnswerType] = useState<string | null>(null);
  const [finalOutput, setFinalOutput] = useState<Item[]>([]);

  const addRow = () => {
    setRows([...rows, {
      column1: '',
      column2: '',
      column3: '',
      column4: '',
      column5: '',
      column6: ''
    }]);
    console.log("ROWWWW", rows)
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, column: keyof Row) => {
    console.log("Calleddd", e, index, column)
    const array = []
    array.push({ id: index, question, expression, operation, showhide, answerType })
    console.log("Calleddd array", array)

    const newItem: Item = {
      index: index,
      question: question,
      expression: expression,
      operation: operation,
      showhide: showhide,
      answerType: answerType
    };
    setFinalOutput(prevItems => [...prevItems, newItem]);
  };

  useEffect(() => {
    console.log("DJFIIFSS", finalOutput)

  }, [finalOutput])
  return (
    <>
      {/* <div>{question} {expression} {operation} {showhide} {answerType}</div> */}

      <div>{`if(`}{finalOutput && finalOutput.map(quesOutput => {
        return (
          <div> {quesOutput.question} {quesOutput.expression} {quesOutput.answerType} {quesOutput.showhide} {quesOutput.operation} </div>
        )
      })}{`)`} </div>
      <div className='container'>
        <div className='row clearfix'>
          <div className='col-md-12 column'>
            <table className='table table-bordered table-hover'>
              <thead>
                <tr>
                  <th> Questions</th>
                  <th> Expressions </th>
                  <th> Value </th>
                  <th> Operations</th>
                  <th> Show/Hide</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <TableRow
                    key={index}
                    row={row}
                    index={index}
                    handleInputChange={handleInputChange}
                    onQuestionChanged={setQuestion}
                    onExpressionChanged={setExpression}
                    onAnswerTypeChanged={setAnswerType}
                    onShowHideChanged={setShowHide}
                    onOperationChanged={setOperation}

                  />
                ))}
              </tbody>
              <Button onClick={addRow}>Add Row</Button>
            </table>
          </div>
        </div>
      </div>



    </>
  )
}
