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
    Row: any,
    column1: string;
    column2: string;
    column3: string;
    column4: string;
    column5: string;
    column6: string;
}

interface Item {
    index: any;
    Field: any;
    Expression: any;
    Operator: any;
    showhide: any;
    AnswerType: any;
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
    questionList: any,
    actionList: any,
    toggleActionList: any,
    deleteRowAction: any,
    setDeleteRowAction: any,
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

const ParentComponent: React.FC<SectionComponentProps> = ({
    sectionKey,
    setSectionOutput,
    setRowKey,
    setSectionKey,
    sampleObj,
    setRowData,
    setCheckboxValues,
    setSectionMinMaxFieldValues,
    questionList,
    actionList,
    toggleActionList,
    deleteRowAction,
    setDeleteRowAction
}) => {
    const initialCheckboxState: CheckboxState = {};
    const [rows, setRows] = useState<Row[]>([]);
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
    const [visibilityEnable, setVisibilityEnable] = useState<any | null>([]);
    const [toggleEnable, setToggledEnable] = useState<any | null>([]);
    const [displayOutput, setDisplayOutput] = useState<any | null>([]);
    const [maxRowId, setMaxRowId] = useState<any | null>(0);
    const [rowCount, setRowCount] = useState<any | null>(0);

    const addRow = () => {
        setRows(prevRows => ([
            ...prevRows,
            {
                Row: maxRowId+1,
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
        const newItem: Item = {
            index: index,
            Field: question,
            Expression: expression,
            Operator: operation,
            showhide: showhide,
            AnswerType: answerType
        };
        // console.log("finalOutput", finalOutput)

        // if (finalOutput && finalOutput?.length) {
        //     let newState = [...finalOutput];
        //     if (updatedValue) {
        //         newState[index][updatedKey] = updatedValue;
        //         setFinalOutput(newState)
        //     }

        // } else {
        //     setFinalOutput(prevItems => [...prevItems, newItem]);
        // }
        // finalOutput && finalOutput?.length && setSectionOutput([{ key: sectionKey, rowOutput: finalOutput }]);

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
                            sectionKey: sectionKey,
                            Row: rowIndex
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
        console.log("keyToDelete ---> ", keyToDelete)

        if (keyToDelete !== 1) {
            setRows(prevRows => prevRows.filter(row => row.Row !== keyToDelete))
            setRowKey(keyToDelete);
            setSectionKey(sectionKey);
            setDeleteRowAction(!deleteRowAction);
            setRowData((prevRows: any[]) => prevRows.filter((row: { Row: number; }) => row.Row !== keyToDelete))

        }

    };

    const handleCheckboxClick = (index: number) => {
    }

    useEffect(() => {
        if (!sampleObj?.length) {
            setRows([{
                Row: 1,
                column1: '',
                column2: '',
                column3: '',
                column4: '',
                column5: '',
            column6: ''
        }]);
        }

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
                        Row: x.Row
                    }
                ]);
            });
        }

        setRowCount(rows.length)

    }, [])

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
        setSectionKey(sectionKey);
        setSectionMinMaxFieldValues(minMaxValue);
    }, [minMaxValue])

    useEffect(() => {
        setSectionKey(sectionKey);
        setCheckboxValues(ifConfitionActions || []);
    }, [ifConfitionActions])


    useEffect(() => {
        console.log("rowsrows ----->", rows);
        setMaxRowId(Math.max(...rows.map(item => item.Row)));
        setRowCount(rows.length)
    }, [rows])

    return (
            <div className='AddSection'>
                    

                        {/* {
                            finalOutput && finalOutput.length && <div className='subTitle mb-15'>{"if("}{finalOutput.map((quesOutput, index) => {
                                if (quesOutput?.Field) {
                                    return `${quesOutput?.Field} ${quesOutput?.Expression || ''} ${quesOutput?.AnswerType || ''} ${finalOutput[index + 1]?.Operator || ''} `
                                }
                            })}{"){"}
                            </div>
                        } */}
                    <div className='tableComponent'>
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
                                                key={row.Row}
                                                row={row}
                                                index={row.Row}
                                                setRowKey={setRowKey}
                                                handleInputChange={handleInputChange}
                                                onQuestionChanged={setQuestion}
                                                onExpressionChanged={setExpression}
                                                onAnswerTypeChanged={setAnswerType}
                                                onShowHideChanged={setShowHide}
                                                onOperationChanged={setOperation}
                                                handleDeleteRow={handleDeleteRow}
                                                handleCheckboxClick={handleCheckboxClick}
                                                sampleObjData={sampleObj && sampleObj[0] && sampleObj[0]["if"].conditions.find((item: any) => item.Row === row.Row) || {}}
                                                questionList={questionList}
                                                rowCount={rowCount}
                                            />
                                        ))}
                                    </tbody>
                                    <Button onClick={addRow} className="btnAddRow">Add Row</Button>
                                </table>
                            </div>
                        </div>
                   
                    <div className='actionfields'>
                        <div className='mt-15'>
                            <div className='subTitle mb-15'>Actions</div>
                            <div>
                                <CheckBox
                                    setCheckboxValues={setIfConditionActions}
                                    checkboxDefaultSelectedValues={sampleObj && sampleObj[0] && sampleObj[0]["if"].actions.options || []}
                                    checkboxValuesFromConfig={actionList && actionList["if_actions"] ? actionList["if_actions"] : []}
                                />
                            </div>
                        </div>
                    

                    {
                        toggleActionList &&
                        toggleActionList.length &&
                        toggleActionList.map((togAction: any) => {
                            return  <><div className='subTitle mb-15'></div><div className='mb-15 flex-wrap'>
                            <div className='visible-box'>
                                <CheckBox
                                    setCheckboxValues={setVisibilityEnable}
                                    checkboxDefaultSelectedValues={sampleObj && sampleObj[0] && sampleObj[0]['if'].actions.options || []}
                                    checkboxValuesFromConfig={[{ value: `${togAction.value}` }]}
                                    
                                    />
                                {togAction.displayName}
                                <Switch
                                    className="custom-toggle"
                                    checkedChildren={togAction.toggleData.disabled.displayName}
                                    unCheckedChildren={togAction.toggleData.enabled.displayName}
                                    onChange={onToggleValueChanged}
                                    disabled={!visibilityEnable.includes(togAction.value)}
                                    />
                            </div>
                        </div></>
                        })
                    }
                        <div>
                            <div className='subTitle mb-15'>Min/Max Field</div>
                            <div className='mb-15 flex-wrap'>
                                <div className='minmaxText'>Min/Max Value:</div>
                                <Switch
                                    className="custom-toggle"
                                    checkedChildren="Min Max Value"
                                    unCheckedChildren="Question Name"
                                    onChange={onToggleValueChanged}
                                />
                            </div>
                            {
                                toggleEnabled ?
                                    <div className='mb-15 flex-wrap'>
                                        <div className='minmaxText'>Min Value:</div>
                                        <NumberInputField selectedValue={{}} handleNumberChange={handleMinValueChange} />
                                    </div>
                                    :
                                    <div className='mb-15 flex-wrap'>
                                        <div className='minmaxText'>Min Value:</div>
                                        <DropDown
                                            sampleData={questionList}
                                            onSelectItem={setMinQuestionValue}
                                            selectedValue={""}
                                        />
                                    </div>
                            }
                            {
                                toggleEnabled ?
                                    <div className='mb-15 flex-wrap'>
                                        <div className='minmaxText'>Max Value:</div>
                                        <NumberInputField selectedValue={{}} handleNumberChange={handleMaxValueChange} />
                                    </div>
                                    :
                                    <div className='mb-15 flex-wrap'>
                                        <div className='minmaxText'>Max Value:</div>
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
            </div>
    )
}

export default ParentComponent