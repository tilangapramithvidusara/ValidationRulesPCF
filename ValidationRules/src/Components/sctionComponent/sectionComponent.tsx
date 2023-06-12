import React, { useEffect, useState } from 'react'
import SearchWithSort from '../../Components/searchWithSort/searchWithSort';
import DropDown from '../../Components/dropDown/dropDown';
import CheckBox from '../../Components/checkbox/checkbox';

import TableRow from '../../Components/tableRow/tableRow';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Button, Checkbox, Input, InputNumber } from 'antd';
import { Switch } from 'antd';
import operationsSampleData from '../../SampleData/sampleInputQuestion';
import NumberInputField from '../numberInput/numberInput';
interface Row {
    key: string,
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
    sectionKey: number;
    setSectionOutput: (outputText: any) => void;
    // setElseAction: any,
    setRowKey: any,
    setSectionKey: any,
    sampleObj: any,
    setRowData: any,
    setCheckboxValues: any,
    setSectionMinMaxFieldValues: any
}

type CheckboxItem = {
    Key: number;
    values: string[];
  };
  
  type CheckboxState = {
    [key: number]: boolean;
  };

  type MinMaxFieldValues = {
    minValue: any,
    maxValue: any,
    sectionKey: any,
    questionName: any
  };

const ParentComponent: React.FC<SectionComponentProps> = ({ sectionKey, setSectionOutput, setRowKey, setSectionKey, sampleObj, setRowData, setCheckboxValues, setSectionMinMaxFieldValues }) => {
    const initialCheckboxState: CheckboxState = {};
    const [rows, setRows] = useState<Row[]>([{
        key:'',
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
    const [enableActionField, setEnableActionField] = useState<boolean | null>(null);
    const [toggleEnabled, setToggleEnabled] = useState(false);
    const [ifConfitionActions, setIfConditionActions] = useState<any | null>(null);

    const [minMaxValue, setMinMaxValue] = useState<MinMaxFieldValues>({
        minValue: 0,
        maxValue: 0,
        sectionKey: null,
        questionName: null
      });
      const [minQuestionValue, setMinQuestionValue] = useState<any | null>(null);
      const [maxQuestionValue, setMaxQuestionValue] = useState<any | null>(null);

    const addRow = () => {
        setRows([...rows, {
            key:'',
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
        console.log("updatedKey", updatedKey)
        console.log("updatedValue", updatedValue)
        console.log("updatedindex", index)

        const newItem: Item = {
            index: index,
            question: question,
            expression: expression,
            operation: operation,
            showhide: showhide,
            answerType: answerType
        };
        console.log("finalOutput", finalOutput)

        if (finalOutput && finalOutput?.length) {
            let newState = [...finalOutput];
            if (updatedValue) {
                newState[index][updatedKey] = updatedValue;
                setFinalOutput(newState)
            }

        } else {
            setFinalOutput(prevItems => [...prevItems, newItem]);
        }
        finalOutput && finalOutput?.length && setSectionOutput([{ key: sectionKey, rowOutput: finalOutput}]);

        // Set the row key when you update the field
        setRowKey(index);
        setSectionKey(sectionKey);
        // Setting the Row Values
        updateConditionAtRowKey(index, updatedKey, updatedValue, sectionKey);
    };

    // Set the if condition when the rows getting updated
    const updateConditionAtRowKey = (rowIndex: any, updateKey: any, updateValue: any, sectionKey: any) => {
        if (updateValue && updateKey) {
            setRowData((prevConditions: any[]) => {      
                const updatedConditions = prevConditions.map((condition: { Row: any; sectionKey: any; }) => {
                  if ((condition.Row === rowIndex ) && (condition.sectionKey === sectionKey)) {
                    return {
                      ...condition,
                        [updateKey]: updateValue,
                      sectionKey: sectionKey
                    };
                  }
                  return condition;
                });      
                const conditionExists = updatedConditions.some((condition: { Row: any; sectionKey: any; }) => (condition.Row === rowIndex) && (condition.sectionKey === sectionKey));
                if (!conditionExists) {
                  return [
                    ...updatedConditions,
                    {
                      [updateKey]: updateValue,
                        Row: rowIndex,
                        sectionKey: sectionKey
                    }
                  ];
                } else {
                  return updatedConditions;
                }
              });
        }
      
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

    useEffect(() => {
        if (sampleObj && sampleObj[0] && sampleObj[0]["if"]) {
          sampleObj[0]["if"].conditions.forEach((x: any) => {
            setRows(prevRows => [
              ...prevRows,
              {
                column1: '',
                column2: '',
                column3: '',
                column4: '',
                column5: '',
                column6: '',
                key: x.Row
              }
            ]);
          });
        }

    }, [sampleObj])

    // useEffect(() => {
    //     console.log("setMinMaxValuessetMinMaxValues", minMaxValues)
       
    // }, [minMaxValues])

    const onToggleValueChanged = (value: any) => {
        setToggleEnabled(value)
    }
    const handleMinValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e); 
        setSectionKey(sectionKey);
        setMinMaxValue((prevState) => {
            return {
              ...prevState,
              minValue: value,
              sectionKey: sectionKey
            };
          });
      };
    
    const handleMaxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e);
        setSectionKey(sectionKey);
        setMinMaxValue((prevState) => {
            return {
              ...prevState,
              maxValue: value,
              sectionKey: sectionKey
            };
          });
      };
    
    useEffect(() => {
        setSectionKey(sectionKey);
        setMinMaxValue((prevState) => {
            return {
                ...prevState,
                maxValue: maxQuestionValue?.label || '',
                minValue: minQuestionValue?.label || ''
            };
        });
    }, [minQuestionValue, maxQuestionValue]);

    useEffect(() => {
        console.log("minMaxValueminMaxValue", minMaxValue);
        setSectionKey(sectionKey);
        setSectionMinMaxFieldValues(minMaxValue);
    }, [minMaxValue])

    useEffect(() => {
        console.log("ifConfitionActions", ifConfitionActions);
        setSectionKey(sectionKey);
        setCheckboxValues(ifConfitionActions || []);
    }, [ifConfitionActions])

    return (
        <div>
            <div className='AddSection'>
                <div className='pcf-wrapper'>
                    <div className='tableComponent'>

                        {
                            finalOutput && finalOutput.length && <div style={{ textAlign: "left"}}>{"if("}{finalOutput.map((quesOutput, index) => {
                                if (quesOutput?.question) {
                                    return `${quesOutput?.question} ${quesOutput?.expression || ''} ${quesOutput?.answerType || ''} ${finalOutput[index + 1]?.operation || ''} `
                                }
                            })}{"){"}
                                {/* <div>{checkboxValues.map(val => (` ${val} &&`))}{`}`}</div> */}
                            </div>
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
                                                key={index+1}
                                                row={row}
                                                index={index+1}
                                                setRowKey={setRowKey}
                                                handleInputChange={handleInputChange}
                                                onQuestionChanged={setQuestion}
                                                onExpressionChanged={setExpression}
                                                onAnswerTypeChanged={setAnswerType}
                                                onShowHideChanged={setShowHide}
                                                onOperationChanged={setOperation}
                                                handleDeleteRow={handleDeleteRow}
                                                handleCheckboxClick={handleCheckboxClick}
                                                sampleObjData={sampleObj && sampleObj[0] && sampleObj[0]["if"].conditions.find((item: any) => item.Row === row.key) || {}}
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
                                    setCheckboxValues={setIfConditionActions}
                                    checkboxDefaultSelectedValues={sampleObj && sampleObj[0] && sampleObj[0]["if"].actions || []}
                                    />
                            </div>
                            <div>Min/Max Field
                                <Switch
                                    className="custom-toggle"
                                    checkedChildren="Min Max Value"
                                    unCheckedChildren="Quesion Name"
                                    onChange={onToggleValueChanged}
                                    />
                            </div>
                            {
                                toggleEnabled ?
                                    <div className='' style={{ textAlign: "left" }}>
                                        <div>
                                            Min Value: <NumberInputField selectedValue={{}} handleNumberChange={handleMinValueChange} />
                                        </div>
                                        <div>
                                            Max Value: <NumberInputField selectedValue={{}} handleNumberChange={handleMaxValueChange} />
                                        </div>
                                    </div>
                                    :
                                    <div className='' style={{ textAlign: "left" }}>
                                        <div>
                                            Min Value:
                                            <DropDown
                                                sampleData={operationsSampleData}
                                                onSelectItem={setMinQuestionValue}
                                                selectedValue={""}
                                            />
                                        </div>
                                        <div>
                                            Max Value:
                                            <DropDown
                                                sampleData={operationsSampleData}
                                                onSelectItem={setMaxQuestionValue}
                                                selectedValue={""}
                                            />
                                        </div>
                                </div>
                            }
                           
                            </div>
                            
                        </div>
                    </div>

                    <div>
                    </div>
                </div>
            </div>
    )
}

export default ParentComponent