import * as React from "react";
import operationsSampleData from '../SampleData/sampleInputQuestion';

declare global {
  interface Window {
    Xrm: any;
  }
}

export const loadAllQuestionsInSurvey = async () => {  
  try {    
    const templateID = await window.parent.Xrm.Page.ui._formContext.getAttribute("gyde_surveytemplate").getValue()[0].id.replace("{", "").replace("}", "");
    console.log('template id =========> ', templateID);
    const result = await window.parent.Xrm.WebApi.retrieveMultipleRecords("gyde_surveytemplatechaptersectionquestion", "?$select=gyde_name,gyde_answertype,gyde_shortname&$filter= _gyde_surveytemplate_value eq " + templateID);
    console.log("result ===========> ", result);
    return {
      error: false,
      data: result?.entities?.length > 0 ? result?.entities : []
    }
    
  } catch (error) {
    console.log("error ========> ", operationsSampleData);
    return {
      error: true,
      // data: [],
      data: operationsSampleData
    }
  }
}

export const getCurrentState = async () => {
  const type = 'gyde_surveytemplatechaptersectionquestion';
  try {    
    const result = await window.parent.Xrm.Page.ui._formContext.contextToken.entityTypeName;
    console.log("Current State ===========> ", result);
    return {
      error: false,
      data: result
    }
    
  } catch (error) {
    console.log("error ========> ", operationsSampleData);
    return {
      error: true,
      // data: [],
      data: type
    }
  }
}


//     window.parent.Xrm.WebApi.retrieveMultipleRecords("gyde_surveytemplatechaptersectionquestion", "?$select=gyde_name,gyde_answertype,gyde_shortname&$filter= _gyde_surveytemplate_value eq " + templateID).then(
//     function success(result: { entities: string | any[]; }) {
//         console.log("xrm questions =======> ", result)
//         for (var i = 0; i < result.entities.length; i++) {
//             console.log(result.entities[i]);
//         }

//     },
//     function (error: { message: any; }) {
//         console.log(error.message);
//     }
// );