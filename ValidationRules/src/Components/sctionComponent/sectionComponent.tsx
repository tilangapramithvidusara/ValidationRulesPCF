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
import { log } from 'console';

interface Row {
    key: any,
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
    setSectionMinMaxFieldValues: any,
    questionList: any
}

type CheckboxState = {
    [key: number]: boolean;
};

type MinMaxFieldValues = {
    minValue: any,
    maxValue: any,
    sectionKey: any,
    questionName: any
};

const ParentComponent: React.FC<SectionComponentProps> = ({ sectionKey, setSectionOutput, setRowKey, setSectionKey, sampleObj, setRowData, setCheckboxValues, setSectionMinMaxFieldValues, questionList }) => {
    const initialCheckboxState: CheckboxState = {};
    const [rows, setRows] = useState<Row[]>([{
        key: 0,
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
    const [removeRow, setRemoveRow] = useState<any | null>(false);

    const addRow = () => {
        setRows(prevRows => ([
            ...prevRows,
            {
                key: prevRows.length,
                column1: '',
                column2: '',
                column3: '',
                column4: '',
                column5: '',
                column6: ''
            }
        ]) as Row[]);
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
        finalOutput && finalOutput?.length && setSectionOutput([{ key: sectionKey, rowOutput: finalOutput }]);

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
                    if ((condition.Row === rowIndex) && (condition.sectionKey === sectionKey)) {
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



    const handleDeleteRow = (keyToDelete: number) => {
        console.log("KEY RO DELETE", rows)

        // setRows(prevRows => {
        //     const filteredRows = prevRows.filter(row => row.key !== keyToDelete);
        //     console.log("KEY RO DELETE 1", filteredRows)
        //     return filteredRows;
        // });
        setRows(prevRows => {
            const filteredRows = prevRows.filter(row => row.key !== keyToDelete);
            const updatedRows = filteredRows.map((row, index) => ({
              ...row,
              key: prevRows[index].key // Update the key of each remaining row based on the original index
            }));
            return filteredRows;
        })        
    };

    useEffect(() => {
        console.log("ROSSSSSS", rows);
    }, [removeRow]);

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
                            finalOutput && finalOutput.length && <div style={{ textAlign: "left" }}>{"if("}{finalOutput.map((quesOutput, index) => {
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
                                                key={row.key}
                                                row={row}
                                                index={row.key}
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
                                                questionList={questionList}
                                            />
                                        ))}
                                    </tbody>
                                    <Button onClick={addRow}>Add Row</Button>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='actionfields' style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div style={{ marginTop: "5%", textAlign: "left" }}>
                            <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Actions</div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
                                <CheckBox
                                    setCheckboxValues={setIfConditionActions}
                                    checkboxDefaultSelectedValues={sampleObj && sampleObj[0] && sampleObj[0]["if"].actions || []}
                                />
                            </div>
                        </div>
                        <div style={{ marginTop: "5%", textAlign: "left" }}>
                            <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Min/Max Field</div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <div style={{ marginRight: '10px' }}>Min/Max Value:</div>
                                <Switch
                                    className="custom-toggle"
                                    checkedChildren="Min Max Value"
                                    unCheckedChildren="Question Name"
                                    onChange={onToggleValueChanged}
                                />
                            </div>
                            {
                                toggleEnabled ?
                                    <div style={{ textAlign: "left", display: 'flex', alignItems: 'center' }}>
                                        <div style={{ width: '200px', marginRight: '10px' }}>Min Value:</div>
                                        <NumberInputField selectedValue={{}} handleNumberChange={handleMinValueChange} />
                                    </div>
                                    :
                                    <div style={{ textAlign: "left", display: 'flex', alignItems: 'center' }}>
                                        <div style={{ width: '200px', marginRight: '10px' }}>Min Value:</div>
                                        <DropDown
                                            sampleData={questionList}
                                            onSelectItem={setMinQuestionValue}
                                            selectedValue={""}
                                        />
                                    </div>
                            }
                            {
                                toggleEnabled ?
                                    <div style={{ textAlign: "left", display: 'flex', alignItems: 'center' }}>
                                        <div style={{ width: '200px', marginRight: '10px' }}>Max Value:</div>
                                        <NumberInputField selectedValue={{}} handleNumberChange={handleMaxValueChange} />
                                    </div>
                                    :
                                    <div style={{ textAlign: "left", display: 'flex', alignItems: 'center' }}>
                                        <div style={{ width: '200px', marginRight: '10px' }}>Max Value:</div>
                                        <DropDown
                                            sampleData={questionList}
                                            onSelectItem={setMaxQuestionValue}
                                            selectedValue={""}
                                        />
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