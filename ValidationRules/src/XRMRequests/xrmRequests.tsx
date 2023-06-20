import * as React from "react";
import operationsSampleData from '../SampleData/sampleInputQuestion';

import { LogicNewSample, questionArraySample } from "../SampleData/SampleLogicData";

declare global {
  interface Window {
    Xrm: any;
  }
}

export const loadAllQuestionsInSurvey = async () => {
  console.log('come');
  try {
    console.log('come2');
    // const templateID = await window.parent.Xrm.Page.ui._formContext.getAttribute("gyde_surveytemplate").getValue()[0].id.replace("{", "").replace("}", "");
    // console.log('template id =========> ', templateID);
    // const result = await window.parent.Xrm.WebApi.retrieveMultipleRecords("gyde_surveytemplatechaptersectionquestion", "?$select=gyde_name,gyde_answertype,gyde_shortname&$filter= _gyde_surveytemplate_value eq " + templateID);
    // console.log("result ===========> ", result);
    console.log('result.entities=====> ', questionArraySample);
    
    return {
      error: false,
      data: questionArraySample
      // result?.entities?.length > 0 ? result?.entities : []
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
  const type = 'gyde_surveytemplatechaptersectionauestion';
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

export const saveValidationRules = async(validationRuleData: object) => {
  try {
    // Xrm.Page.ui._formContext.contextToken.entityTypeName
    // Xrm.Page.ui._formContext.data.entity.getId()

    const id = await window.parent.Xrm.Page.ui._formContext.data.entity.getId().replace("{", "").replace("}", "");
    const currentEntity = await window.parent.Xrm.Page.ui._formContext.contextToken.entityTypeName;
    console.log("validation rules data ===========> ", validationRuleData);
    
  } catch (error) {
    console.log("save error =========> ", error);
    
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

// export const fetchRecordId = async (

//   ): Promise<any> => {
//     try {
//       const result = await window.parent.Xrm.Page.ui.formContext.data.entity.getId();
//       // const str = '{AC3FE85C-90E5-ED11-A7C7-000D3A338DD2}';
//       console.log("result in fetch record id",result);
//       const removedBrackets = result.replace(/[{}]/g, '');
  
//       console.log("removedBrackets",removedBrackets);
//       return { error: false, data: removedBrackets, loading: false };
//     } catch (error: any) {
//       // handle error conditions
//       console.log("error",error);
//       return { error: true, data: [], loading: false };
//     }
//   };
  
//   export const fetchRequest = async (
//     entityLogicalName: any,
//     id: string,
//     columnsNames:string
//   ): Promise<any> => {
//     try {
//       const result = await window.parent.Xrm.WebApi.retrieveRecord(entityLogicalName,id,columnsNames);
//       console.log("result in fetch request json parse..",result);
//       console.log("gyde_name..",result.gyde_name);
//       console.log("gyde_jsoncolumn..",result.gyde_jsoncolumn);
//       return { error: false, data: result, loading: false };
//     } catch (error: any) {
//       // handle error conditions
//       console.log("error",error);
//       return { error: true, data: [], loading: false };
//     }
//   };
  
//   export const saveRequest = async (
//     entityLogicalName: any,
//     id: string,
//     data:any
//   ): Promise<any> => {
//     try {
//       const result = await window.parent.Xrm.WebApi.updateRecord(entityLogicalName,id,{"gyde_jsondata": data});
//       return { error: false, data: result, loading: false };
//     } catch (error: any) {
//       // handle error conditions
//       console.log("error",error);
//       return { error: true, data: [], loading: false };
//     }
//   };