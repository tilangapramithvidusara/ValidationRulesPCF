import React, { useEffect, useState } from 'react'
import SearchWithSort from '../../Components/searchWithSort/searchWithSort';
import DropDown from '../../Components/dropDown/dropDown';
import CheckBox from '../../Components/checkbox/checkbox';

import TableRow from '../../Components/tableRow/tableRow';



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
  index: any;
  question: any;
  expression: any;
  operation: any;
  showhide: any;
  answerType: any;
}

interface SectionComponentProps {
    sectionKey: string | number;
    setSectionOutput: (outputText: any) => void;
  }

const ParentComponent: React.FC<SectionComponentProps> = ({ sectionKey, setSectionOutput }) => {
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
      const [finalOutput, setFinalOutput] = useState<any[]>([]);
      const [checkboxValues, setCheckboxValues] = useState<any[]>([]);

      const addRow = () => {
        setRows([...rows, {
          column1: '',
          column2: '',
          column3: '',
          column4: '',
          column5: '',
          column6: ''
        }]);
      };
    
      const handleInputChange = (index: number, column: any) => {
        const updatedKey = Object.keys(column)[0];
        const updatedValue = Object.values(column)[0];
    
        const array = []
        array.push({ id: index, question, expression, operation, showhide, answerType })    
        const newItem: Item = {
          index: index,
          question: question,
          expression: expression,
          operation: operation,
          showhide: showhide,
          answerType: answerType
        };
        if (finalOutput && finalOutput.length) {
            let newState = [...finalOutput];
            newState[index][updatedKey] = updatedValue;
            setFinalOutput(newState)
        } else {
          setFinalOutput(prevItems => [...prevItems, newItem]);
        }
        finalOutput && finalOutput.length && setSectionOutput([{key: sectionKey, rowOutput: finalOutput, checkboxValues: checkboxValues}]);
      };

    const handleDeleteRow = (index: number) => {
        if (rows && rows.length >= 2) {
            const updatedRows = [...rows];
            updatedRows.splice(index, 1);
            setRows(updatedRows);
          }
      
      };
    
    const handleCheckboxClick = (index: number) => {
        console.log("Checkbox Clicked ", index)
    }
    return (
        <div>
            <div className='AddSection'>
                <div className='pcf-wrapper'>
                    <div className='tableComponent'>

                        {
                            finalOutput && finalOutput.length && <div>{"if("}{finalOutput.map((quesOutput, index) => {
                            if (quesOutput?.question) {
                                return `${quesOutput?.question} ${quesOutput?.expression || ''} ${quesOutput?.answerType || ''} ${finalOutput[index + 1]?.operation || ''} `
                            }
                        })}{"){"} <div>{checkboxValues.map(val => (` ${val} &&`))}{`}`}</div> </div>
                        }
                    
                        <div className='row clearfix'>
                            <div className='col-md-12 column'>
                                <table className='table table-bordered table-hover'>
                                    <thead>
                                        <tr>
                                            <th> </th>
                                            <th> And/OR</th>
                                            <th> Field </th>
                                            <th> Operator </th>
                                            <th> Value </th>
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
                                                handleDeleteRow={handleDeleteRow}
                                                handleCheckboxClick={handleCheckboxClick}
                                            />
                                        ))}
                                    </tbody>
                                    <Button onClick={addRow}>Add Row</Button>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='actionfields'>
                        <div style={{ marginTop: "5%", textAlign: "left" }}>
                            <div>Actions</div>
                            <div>
                                <CheckBox
                                    setCheckboxValues={setCheckboxValues}
                                />
                            </div>
                        </div>
                    </div>
                    {/* <Button onClick={handleRemoveSection}>Remove Clause</Button> */}
                </div>
            </div>
            
        </div>
    )
}

export default ParentComponent