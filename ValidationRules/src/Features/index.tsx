import React, { useEffect, useState } from 'react';
import SectionComponent from '../Components/sctionComponent/sectionComponent';
import { loadAllQuestionsInSurvey } from '../XRMRequests/xrmRequests';
import DisplayText from '../Components/displayText/displayText';
import { Button, Checkbox, Switch } from 'antd';
import CheckBox from '../Components/checkbox/checkbox';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import NumberInputField from '../Components/numberInput/numberInput';
import DropDown from '../Components/dropDown/dropDown';
import operationsSampleData from '../SampleData/sampleInputQuestion';

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
        maxValue:  null,
        sectionKey: null,
        questionName: null
    });
    const [minQuestionValue, setMinQuestionValue] = useState<any | null>(null);
    const [maxQuestionValue, setMaxQuestionValue] = useState<any | null>(null);
    const [elseShowOutput, setElseShowOutput] = useState<any[]>([]);

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
        // set result.data to a state
    };

    useEffect(() => {
        loadQuestionHandler();
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
            console.log("prevRowData", prevRowData)
      
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
               

                // if ((elseSection && elseSection.length) || (elseSectionMinMax?.minValue && elseSectionMinMax?.maxValue)) {
                //     result = `${elseSection.join("&&")}&&min=${elseSectionMinMax.minValue}&&max=${elseSectionMinMax.maxValue}`;
                // }
                
                if (ifConditionMinMaxObj.minValue) {
                    result.push(`min=${ifConditionMinMaxObj.minValue}`)
                  }
                  
                  if (ifConditionMinMaxObj.maxValue) {
                    result.push(`max=${ifConditionMinMaxObj.maxValue}`)
                  }
                //   result += `min=${elseSectionMinMax.minValue}&&max=${elseSectionMinMax.maxValue}`;
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
        console.log(`checked = ${e.target.checked}`);
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
        // if ((elseSection && elseSection.length) || (elseSectionMinMax?.minValue && elseSectionMinMax?.maxValue)) {
        //     result = `${elseSection.join("&&")}&&min=${elseSectionMinMax.minValue}&&max=${elseSectionMinMax.maxValue}`;
        // }
        
        if (elseSectionMinMax.minValue) {
            result.push(`min=${elseSectionMinMax.minValue}`)
          }
          
          if (elseSectionMinMax.maxValue) {
            result.push(`max=${elseSectionMinMax.maxValue}`)
          }
        //   result += `min=${elseSectionMinMax.minValue}&&max=${elseSectionMinMax.maxValue}`;
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
        console.log("minMaxValueminMaxValue", minMaxValue)
    }, [minMaxValue])

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
        <div className="displayText" style={{textAlign: "left", padding: "2%", border: "ridge", backgroundColor: "#D3D3D3" }}>
              <DisplayText fieldOutputData={[]} />
              {
                  showOutput && showOutput.length>0 && showOutput.map(x => {
                      return (
                          <div>
                              <div> {`if(${x.expressions})`} {`{ ${x.actions} }`}</div>
                          </div>
                       
                    )
                })
              }
             {
                elseShowOutput && elseShowOutput.length > 0 && elseShowOutput.map(x => {
                    console.log("DFFFFdddd", x);
                    return (
                    <div>
                            <div> {`else{${x}}`}</div>
                    </div>
                    );
                })
            }
        </div>
            {sections.map((section) => (
                <div key={section.key} style={{border: "ridge"}}>
                        <div>
                            <SectionComponent
                                sectionKey={section.key}
                                setSectionOutput={setSectionOutput}
                                setRowKey={setRowKey}
                                setSectionKey={setSectionKey}
                                sampleObj={sampleData?.ifConditions?.find((item: any) => item.index === section.key)?.blocks || []}
                                setRowData={setRowData}
                                setCheckboxValues={setCheckboxValues}
                                setSectionMinMaxFieldValues={setSectionMinMaxFieldValues}
                            />
                        </div>
                    <div>
                        <Button onClick={() => handleRemoveSection(section.key)}>Remove Clause</Button>
                    </div>
                    
                </div>
            ))}
          <Button onClick={handleAddSection}>Add New Clause</Button>
          <div className='else-actions'>
                            <div className='' style={{ textAlign: "left" }}>
                                <Checkbox
                                    onChange={onActionCheckboxChanged}
                                    defaultChecked={sampleData?.elseConditions?.actions?.length}
                                /> Else actions
                            </div>
                                {
                                    enableActionField ?
                                        <div style={{ textAlign: "left" }}>
                                            <div>
                                                <CheckBox
                                                    setCheckboxValues={setElseActionCheckboxValues}
                                                    checkboxDefaultSelectedValues={sampleData?.elseConditions?.actions || []}
                                                />
                                            </div>
                                    </div> : <div></div>
                                }
                            </div>
                            <div>
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
  );
};

export default ParentComponent;
