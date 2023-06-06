import React, { useEffect, useState } from 'react'
import SectionComponent from '../Components/sctionComponent/sectionComponent';
import { loadAllQuestionsInSurvey } from '../XRMRequests/xrmRequests';


import { Button } from 'antd';

const ParentComponent: React.FC = () => {
    console.log('eee');
    
    const [sections, setSections] = useState<{ key: string | number }[]>([{ key: 1 }]);

    let handleAddSection = () => {
        const newKey = Math.round(Math.random() * (10000));
        setSections([...sections, { key: newKey }]);
    }

    const handleRemoveSection = (sectionKey: any) => {
        if(sections.length >= 2)
            setSections(sections.filter((section) => section.key !== sectionKey))
    }

    const loadQuestionHandler = async() => {
        const result = await loadAllQuestionsInSurvey();
        // set result.data to a state
    }

    useEffect(() => {
        console.log("============= 00 ===========> ");
        loadQuestionHandler();
    }, [])

    return (
        <div>
            {sections.map((section) => (
                <div> 
                    <div>
                        <SectionComponent key={section.key} sectionKey={section.key} />
                    </div>
                    <div>
                        <Button onClick={() => handleRemoveSection(section.key)}>Remove Clause</Button>
                    </div>
                 </div>     
            ))}
            <Button onClick={handleAddSection}>Add New Clause</Button>
        </div>
    )
}

export default ParentComponent