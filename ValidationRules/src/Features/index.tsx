import React, { useEffect, useState } from 'react';
import SectionComponent from '../Components/sctionComponent/sectionComponent';
import { loadAllQuestionsInSurvey, getCurrentState } from '../XRMRequests/xrmRequests';
import DisplayText from '../Components/displayText/displayText';
import { Button, Checkbox, Switch } from 'antd';
import CheckBox from '../Components/checkbox/checkbox';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import NumberInputField from '../Components/numberInput/numberInput';
import DropDown from '../Components/dropDown/dropDown';
import operationsSampleData from '../SampleData/sampleInputQuestion';
import configs from '../configs/actionMapper';
// import removeIcon from '../assets/delete.png';
import { generateJsonLogicHandler } from '../Utils/logics.utils';
import { LogicNewSample } from '../SampleData/SampleLogicData';
import { saveLogicHandler } from '../Utils/save.utils';

type MinMaxFieldValues = {
    minValue: any,
    maxValue: any,
    sectionKey: any,
    questionName: any
};
  
const ParentComponent: React.FC = () => {
    const [sectionOutput, setSectionOutput] = useState<any[]>([]);
    const [elseAction, setElseAction] = useState<any[]>([]);
    const [mappedElseActionCheckboxValues, setMappedElseActionCheckboxValues] = useState<any[]>([]);
    const [sectionKey, setSectionKey] = useState<any>(1);
    const [rowKey, setRowKey] = useState<any>();
    const [sampleData, setSampleData] = useState<any>({
        // ifConditions: [
        //     {
        //         index: 1,
        //         blocks: [
        //             {
        //                 if: {
        //                     conditions: [
        //                         {
        //                             Row: 3,
        //                             expression: 'isEqualTo',
        //                             Field: 'Question01',
        //                             Operator: '&&',
        //                             Value: 'String01',
        //                         },
        //                         {
        //                             Row: 4,
        //                             expression: 'graterThan',
        //                             Field: 'Question02',
        //                             Operator: '||',
        //                             Value: 'String01',
        //                         }
        //                     ],
        //                     actions: ['show', 'hide'],
        //                     minMax: {
        //                         min: 123,
        //                         max: 234,
        //                         value: 'Question01' // This is optional
        //                     }
        //                 },
        //             },
        //         ],
        //     },
        //     {
        //         index: 2,
        //         blocks: [
        //             {
        //                 if: {
        //                     conditions: [
        //                         {
        //                             Row: 10,
        //                             expression: 'LowerThan',
        //                             Field: 'Question03',
        //                             Operator: '',
        //                             Value: 'String01',
        //                         },
        //                         {
        //                             Row: 11,
        //                             expression: 'LowerThan',
        //                             Field: 'Question03',
        //                             Operator: '&&',
        //                             Value: 'String01',
        //                         },
        //                         {
        //                             Row: 13,
        //                             expression: 'LowerThan',
        //                             Field: 'Question03',
        //                             Operator: '&&',
        //                             Value: 'String01',
        //                         }
        //                     ],
        //                     actions: ['show', 'hideAndOutput'],
        //                 },
        //             },
        //         ],
        //     },
        // ],
        // elseConditions: [{
        //     conditions: [],
        //     actions: ['disable', 'show'],
        //   }],
    });
    const [sections, setSections] = useState<{ key: number }[]>(sampleData?.ifConditions?.length ? sampleData?.ifConditions.map((_: any) => ({ key: _.index })) : [{ key: 1 }]);
    const [rowData, setRowData] = useState<any[]>([]);
    const [conditionData, setConditionData] = useState<any[]>([]);
    const [checkboxValues, setCheckboxValues] = useState<any[]>([]);
    const [showOutput, setShowOutput] = useState<any[]>([]);
    const [enableActionField, setEnableActionField] = useState<boolean | null>(null);
    const [elseActionCheckboxValues, setElseActionCheckboxValues] = useState<any[]>([]);
    const [jsonArrayFormat, setJsonArrayFormat] = useState<{ ifConditions: any[]; elseConditions: any[] }>({ ifConditions: [], elseConditions: [] });
    const [sectionMinMaxFieldValues, setSectionMinMaxFieldValues] = useState<MinMaxFieldValues>({
        minValue: null,
        maxValue: null,
        sectionKey: null,
        questionName: null
    })
    const [toggleEnabled, setToggleEnabled] = useState(false);
    const [minMaxValue, setMinMaxValue] = useState<MinMaxFieldValues>({
        minValue: null,
        maxValue: null,
        sectionKey: null,
        questionName: null
    });
    const [minQuestionValue, setMinQuestionValue] = useState<any | null>(null);
    const [maxQuestionValue, setMaxQuestionValue] = useState<any | null>(null);
    const [elseShowOutput, setElseShowOutput] = useState<any[]>([]);

    // Get From XRM Requests
    const [questionList, setQuestionList] = useState<any[]>([]);
    const [actionList, setActionList] = useState<any>();

    let handleAddSection = () => {
        const newKey = Math.round(Math.random() * 10000);
        setSections([...sections, { key: newKey }]);
        setSectionKey(newKey);
    };

    const handleRemoveSection = (sectionKey: any) => {
        if (sections.length >= 2)
            setSections(sections.filter((section) => section.key !== sectionKey));
    };

    const loadQuestionHandler = async () => {
        const result = await loadAllQuestionsInSurvey();
        console.log('resss =====> ', result);
        
        let questionListArray = result.data || [];
        // Check if 'result.data' exists and has 'entities' property
        if (questionListArray && questionListArray.length) {
            const formattedQuestionList = questionListArray.map((quesNme:any) => {
                return { label: quesNme.gyde_name, value: quesNme.gyde_name, questionType: 'numeric'}
            })
            formattedQuestionList && formattedQuestionList.length && setQuestionList(formattedQuestionList);
        } else {
          // Handle the case when 'entities' property is not present
          setQuestionList([]);
        }
    };
    
    const _getCurrentState = async () => {
        const result = await getCurrentState();
        console.log("configs['queston_actions']", configs['queston_actions'])
        if (result.data.includes('queston')) {
            setActionList(configs['queston_actions']['actions'])
        } else if (result.data.includes('section')) {
            setActionList(configs['section_actions']['actions'])
        } else if (result.data.includes('chapter')) {
            setActionList(configs['chapter_actions']['actions'])
        } else {
            setActionList([])
        }
    }

    useEffect(() => {
        console.log("ACTLIST", actionList);

    }, [actionList])

    useEffect(() => {
        // loadQuestionHandler();
        // _getCurrentState()
        //////
        const logic = generateJsonLogicHandler(LogicNewSample);
        console.log("11111111111111111======> ", logic);
        const final = saveLogicHandler(logic);
        console.log("final 111111222222===> ", final);
        
        
    }, []);

    // Update all section else when adding a new section with else
    useEffect(() => {
        const existingIndex = mappedElseActionCheckboxValues.findIndex(
            (item) => item.key === sectionKey
        );
        if (existingIndex === -1) {
            // Key does not exist, add a new object to the array
            setMappedElseActionCheckboxValues((prevState) => [
                ...prevState,
                { key: sectionKey, values: elseAction },
            ]);
        } else {
            // Key exists, update the existing object
            setMappedElseActionCheckboxValues((prevState) => {
                const updatedValues = [...prevState];
                updatedValues[existingIndex].values = elseAction;
                return updatedValues;
            });
        }
    }, [elseAction, sectionKey]);

    useEffect(() => {
        console.log("checkboxValuescheckboxValues 1", checkboxValues);
        console.log("DJFEJFIEEF", sectionKey);
        rowData.sort((a, b) => a.Row - b.Row);
        const transformedData = {
            index: sectionKey,
            blocks: [
                {
                    if: {
                        conditions: rowData?.filter(rowDta => rowDta.sectionKey === sectionKey),
                        actions: checkboxValues || [],
                        minMax: sectionMinMaxFieldValues,
                    },
                    else: {
                        conditions: [],
                        actions: elseActionCheckboxValues || [],
                        minMax: minMaxValue,
                    },
                },
            ],
        };
        console.log("transformedData", transformedData);

        setConditionData(prevRowData => {
            const updatedRowData = prevRowData.map(secData => {
                if (secData.index === sectionKey) {
                    return {
                        ...secData,
                        ...transformedData,
                    };
                }
                return secData;
            });
            console.log("updatedRowData", updatedRowData)
            if (updatedRowData.some(secData => secData.index === sectionKey)) {
                return updatedRowData;
            } else {
                return [...updatedRowData, transformedData];
            }
        });

        const _transformedData = {
            ifConditions: conditionData,
            elseConditions: [{ conditions: [], actions: elseActionCheckboxValues, minMax: minMaxValue }],
        };

        setJsonArrayFormat(() => _transformedData);

    }, [rowData,
        checkboxValues,
        elseActionCheckboxValues,
        sectionKey,
        minMaxValue,
        sectionMinMaxFieldValues]);


    useEffect(() => {
        console.log("conditionData 2", conditionData)
        const indexes = conditionData.map(x => x.index);
        console.log("indexes indexes", indexes)
        console.log("indexes conditionData", conditionData)

        const expressionArray: React.SetStateAction<any[]> = [];
        //   let operatorString = "" 
        indexes.forEach(x => {
            const releventDta = conditionData.filter(y => y.index === x)
            if (releventDta && releventDta[0] && releventDta[0].blocks && releventDta[0].blocks[0]) {
                const ifConditionArray = releventDta[0].blocks[0].if.conditions
                let ifConditionActionArray = releventDta[0].blocks[0].if?.actions || [];
                let ifConditionMinMaxObj = releventDta[0].blocks[0].if?.minMax || {};
                let result = [];
                if (ifConditionMinMaxObj.minValue) {
                    result.push(`min=${ifConditionMinMaxObj.minValue}`)
                }
                if (ifConditionMinMaxObj.maxValue) {
                    result.push(`max=${ifConditionMinMaxObj.maxValue}`)
                }
                console.log("ifConditionActionArray", ifConditionActionArray);
                let mergedArray = [...ifConditionActionArray, ...result].join("&&")
                setElseShowOutput([mergedArray])

                console.log("elseShowOutput", elseShowOutput);


                console.log("ifConditionActionArray", result)
                const expressions = ifConditionArray.map((condition: { Row: any; expression: any; question: any; operation: any; answerType: any; }, index: any) => {
                    const { Row, expression, question, operation, answerType } = condition;
                    // operatorString = operation
                    return `${question || ''} ${expression || ''} ${answerType || ''} ${ifConditionArray[index + 1]?.operation || ''}`;
                });

                expressionArray.push({ expressions: `${expressions}`, actions: mergedArray || [] })
                setShowOutput(expressionArray)
            }
        })


    }, [conditionData])

    const onActionCheckboxChanged = (e: CheckboxChangeEvent) => {
        setEnableActionField(!enableActionField);
    };
    useEffect(() => {
        if (sampleData?.elseConditions?.actions?.length) setEnableActionField(true)
    }, []);

    useEffect(() => {
        console.log("jsonArrayFormat", jsonArrayFormat);
        const elseSection = jsonArrayFormat?.elseConditions[0]?.actions || []
        const elseSectionMinMax = jsonArrayFormat?.elseConditions[0]?.minMax || {}
        console.log("elseSectionMinMax", elseSectionMinMax);
        console.log("elseSection", elseSection);
        let result = []
        if (elseSectionMinMax.minValue) {
            result.push(`min=${elseSectionMinMax.minValue}`)
        }

        if (elseSectionMinMax.maxValue) {
            result.push(`max=${elseSectionMinMax.maxValue}`)
        }
        console.log("resultresult", elseSection);
        let mergedArray = [...elseSection, ...result].join("&&")
        setElseShowOutput([mergedArray])

        console.log("elseShowOutput", elseShowOutput);

    }, [jsonArrayFormat])

    const handleMinValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e);
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
        setMinMaxValue((prevState) => {
            return {
                ...prevState,
                maxValue: value,
                sectionKey: sectionKey
            };
        });
    };

    useEffect(() => {
        setMinMaxValue((prevState) => {
            return {
                ...prevState,
                maxValue: maxQuestionValue?.label || '',
                minValue: minQuestionValue?.label || ''
            };
        });
    }, [minQuestionValue, maxQuestionValue]);

    const onToggleValueChanged = (value: any) => {
        setToggleEnabled(value)
    }
    return (
        <div>
            <div className="displayText">
                <DisplayText fieldOutputData={[]} />
                {
                    showOutput && showOutput.length > 0 && showOutput.map(x => {
                        return (
                            <div>
                                <div> {`if(${x.expressions})`} {`{ ${x.actions} }`}</div>
                            </div>

                        )
                    })
                }
                {
                    elseShowOutput && elseShowOutput.length > 0 && elseShowOutput.map(x => {
                        return (
                            <div>
                                <div> {`else{${x}}`}</div>
                            </div>
                        );
                    })
                }
            </div>
            {sections.map((section) => (
                <div key={section.key}>
                        <SectionComponent
                            sectionKey={section.key}
                            setSectionOutput={setSectionOutput}
                            setRowKey={setRowKey}
                            setSectionKey={setSectionKey}
                            sampleObj={sampleData?.ifConditions?.find((item: any) => item.index === section.key)?.blocks || []}
                            setRowData={setRowData}
                            setCheckboxValues={setCheckboxValues}
                            setSectionMinMaxFieldValues={setSectionMinMaxFieldValues}
                            questionList={questionList}
                            actionList={actionList}
                        />
                    
                    <div className='text-left'>
                        <Button onClick={() => handleRemoveSection(section.key)} className="btnAddRow">Remove Clause</Button>
                    </div>

                </div>
            ))}
            <div className='text-left'><Button onClick={handleAddSection} className="btnAddRow">Add New Clause</Button></div>
            <div className='else-actions tableComponent'>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
                            <Checkbox
                                onChange={onActionCheckboxChanged}
                                defaultChecked={sampleData?.elseConditions?.actions?.length}
                            />
                            <span className='elseText'>Else actions</span></div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
                            {
                                enableActionField ? <div>
                                    <CheckBox
                                        setCheckboxValues={setElseActionCheckboxValues}
                                        checkboxDefaultSelectedValues={sampleData?.elseConditions?.actions || []}
                                        checkboxValuesFromConfig={actionList && actionList["else_actions"] ? actionList["else_actions"] : []}
                                    /> </div> : <div></div>
                            }
                        </div>
                    </div>
            
            <div>
                <div className='subTitle mb-15'>Min/Max Field</div>
                <div className='mb-15 flex-wrap'>
                    <div className='minmaxText'>Min/Max Value:</div>
                    <Switch
                        className="custom-toggle"
                        checkedChildren="Min Max Value"
                        unCheckedChildren="Quesion Name"
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
                                sampleData={operationsSampleData}
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
                                sampleData={operationsSampleData}
                                onSelectItem={setMaxQuestionValue}
                                selectedValue={""}
                            />
                        </div>
                }
            </div>
            </div>
        </div>
    );
};

export default ParentComponent;
