import React, { useEffect, useState } from 'react';
import SectionComponent from '../Components/sctionComponent/sectionComponent';
import { loadAllQuestionsInSurvey } from '../XRMRequests/xrmRequests';
import DisplayText from '../Components/displayText/displayText';
import { Button } from 'antd';

const ParentComponent: React.FC = () => {
  const [sectionOutput, setSectionOutput] = useState<any[]>([]);
  const [elseAction, setElseAction] = useState<any[]>([]);
  const [mappedElseActionCheckboxValues, setMappedElseActionCheckboxValues] = useState<any[]>([]);
  const [sectionKey, setSectionKey] = useState<any>(1);
  const [rowKey, setRowKey] = useState<any>();
  const [sampleData, setSampleData] = useState<any>([
    // {
    //   index: 1,
    //   blocks: [
    //     {
    //       if: {
    //         conditions: [
    //           {
    //             Row: 3,
    //             expression: 'isEqualTo',
    //             Field: 'Question01',
    //             Operator: '&&',
    //             Value: 'String01',
    //           },
    //           {
    //             Row: 4,
    //             expression: 'graterThan',
    //             Field: 'Question02',
    //             Operator: '||',
    //             Value: 'String01',
    //           }
    //         ],
    //         actions: ['show', 'hide'],
    //       },
    //       else: {
    //         conditions: [],
    //         actions: ['disable', 'show'],
    //       },
    //     },
    //   ],
    // },
    // {
    //   index: 2,
    //   blocks: [
    //     {
    //       if: {
    //         conditions: [
    //           {
    //             Row: 10,
    //             expression: 'LowerThan',
    //             Field: 'Question03',
    //             Operator: '&&',
    //             Value: 'String01',
    //           }
    //         ],
    //         actions: ['show', 'hideAndOutput'],
    //       },
    //       else: {
    //         conditions: [],
    //         actions: ['show', 'hideAndOutput'],
    //       },
    //     },
    //   ],
    // },
  ]);
  const [sections, setSections] = useState<{ key: number }[]>(sampleData && sampleData.length ? sampleData.map((_: any) => ({ key: _.index })): [{ key: 1 }]);
  const [rowData, setRowData] = useState<any[]>([]);
  const [conditionData, setConditionData] = useState<any[]>([]);
  const [checkboxValues, setCheckboxValues] = useState<any[]>([]);
  const [showOutput, setShowOutput] = useState<any[]>([]);

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
    console.log("checkboxValuescheckboxValues 1", rowData);
    console.log("DJFEJFIEEF", sectionKey);
    rowData.sort((a, b) => a.Row - b.Row);
    const transformedData = {
      index: sectionKey,
      blocks: [
        {
          if: {
            conditions: rowData.filter(rowDta => rowDta.sectionKey === sectionKey),
            actions: checkboxValues,
          },
          else: {
            conditions: [],
            actions: checkboxValues,
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
  
      if (updatedRowData.some(secData => secData.index === sectionKey)) {
        return updatedRowData;
      } else {
        return [...updatedRowData, transformedData];
      }
    });
  }, [rowData, checkboxValues, sectionKey]);
  
    
  useEffect(() => {
      console.log("rowDatarowDatarowData 2", rowData)
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
              let ifConditionActionArray = releventDta[0].blocks[0].if.actions.join(" && ")
            const expressions = ifConditionArray.map((condition: { Row: any; expression: any; question: any; operation: any; answerType: any; }, index: any) => {
                const { Row, expression, question, operation, answerType } = condition;
                // operatorString = operation
                return `${question || ''} ${expression || ''} ${answerType || ''} ${ifConditionArray[index + 1]?.operation || ''}`;
          });
          
              expressionArray.push({expressions:`${expressions}`, actions: ifConditionActionArray})
              setShowOutput(expressionArray)
          }
        
      })

  }, [conditionData, rowData])
    
  return (
    <div>
        <div className="displayText" style={{textAlign: "left", padding: "2%", border: "ridge", backgroundColor: "#D3D3D3" }}>
              <DisplayText fieldOutputData={[]} />
              {
                  showOutput.map(x => {
                      return (
                          <div>
                              <div> {`if(${x.expressions})`} {`{${x.actions}}`}</div>
                          </div>
                       
                    )
                })
              }
        </div>
            {sections.map((section) => (
                <div key={section.key} style={{border: "ridge"}}>
                        <div>
                            <SectionComponent
                                sectionKey={section.key}
                                setSectionOutput={setSectionOutput}
                                setElseAction={setElseAction}
                                setRowKey={setRowKey}
                                setSectionKey={setSectionKey}
                                sampleObj={sampleData.find((item: any) => item.index === section.key)?.blocks || []}
                                setRowData={setRowData}
                                setCheckboxValues={setCheckboxValues}
                            />
                        </div>
                    <div>
                        <Button onClick={() => handleRemoveSection(section.key)}>Remove Clause</Button>
                    </div>
                </div>
            ))}
      <Button onClick={handleAddSection}>Add New Clause</Button>
    </div>
  );
};

export default ParentComponent;
