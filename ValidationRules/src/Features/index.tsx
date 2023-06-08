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
    {
      index: 1,
      blocks: [
        {
          if: {
            conditions: [
              {
                Row: 3,
                expression: '',
                Field: 'Question01',
                Operator: 'isEqualTo',
                Value: 'String01',
              },
              {
                Row: 4,
                expression: '||',
                Field: 'Question02',
                Operator: 'isEqualTo',
                Value: 'String01',
              }
            ],
            actions: ['Show', 'Hide'],
          },
          else: {
            conditions: [],
            actions: ['Show', 'Hide'],
          },
        },
      ],
    },
    {
      index: 2,
      blocks: [
        {
          if: {
            conditions: [
              {
                Row: 10,
                expression: '',
                Field: 'Question03',
                Operator: 'isEqualTo',
                Value: 'String01',
              }
            ],
            actions: ['Show', 'Hide'],
          },
          else: {
            conditions: [],
            actions: ['Show', 'Hide'],
          },
        },
      ],
    },
  ]);
  const [sections, setSections] = useState<{ key: number }[]>(sampleData ? sampleData.map((_: any) => ({ key: _.index })): 1);

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

  return (
    <div>
      <div className="displayText">
        <DisplayText fieldOutputData={[]} />
      </div>
      {sections.map((section) => (
        <div key={section.key}>
          <div>
            <SectionComponent
              sectionKey={section.key}
              setSectionOutput={setSectionOutput}
              setElseAction={setElseAction}
              setRowKey={setRowKey}
              setSectionKey={setSectionKey}
              sampleObj={sampleData.find((item: any) => item.index === section.key)?.blocks || []}
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
