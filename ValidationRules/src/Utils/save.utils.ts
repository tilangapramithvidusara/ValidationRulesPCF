import { log } from "console";
import { saveRuleLogicalName, minMaxRule } from "../configs/saveRuleMapper";

const minMaxHandler = (actions: any, finalSaveOutput: any[]) => {
  if (actions?.minMax) {            
    const minMaxSet = [];
    const key = saveRuleLogicalName["minMax"];
    if (actions?.minMax?.min) {
      if (typeof actions?.minMax?.min === 'number') {
        minMaxSet.push({
          type: minMaxRule['min'],
          value: actions?.minMax?.min,
          inclusive: true,
        })
      } else {
        minMaxSet.push({
          type: minMaxRule['min'],
          value: {var: actions?.minMax?.min},
          inclusive: true,
        })
      }
    }
    if (actions?.minMax?.max) {
      if (typeof actions?.minMax?.max === 'number') {
        minMaxSet.push({
          type: minMaxRule['max'],
          value: actions?.minMax?.max,
          inclusive: true,
        })
      } else {
        minMaxSet.push({
          type: minMaxRule['max'],
          value: {var: actions?.minMax?.max},
          inclusive: true,
        })
      }
    }
    if (actions?.minMax?.minLength) {
      if (typeof actions?.minMax?.minLength === 'number') {
        minMaxSet.push({
          type: minMaxRule['minLength'],
          value: actions?.minMax?.minLength,
          inclusive: true,
        })
      } else {
        minMaxSet.push({
          type: minMaxRule['minLangth'],
          value: {var: actions?.minMax?.minLength},
          inclusive: true,
        })
      }
    }
    if (actions?.minMax?.maxLength) {
      if (typeof actions?.minMax?.max === 'number') {
        minMaxSet.push({
          type: minMaxRule['maxLength'],
          value: actions?.minMax?.maxLength,
          inclusive: true,
        })
      } else {
        minMaxSet.push({
          type: minMaxRule['maxLength'],
          value: {var: actions?.minMax?.maxLength},
          inclusive: true,
        })
      }
    }
    const data = finalSaveOutput[key];
    if (data?.length > 0) {
      finalSaveOutput[key] = data.concat(minMaxSet);
    } else {
      finalSaveOutput[key] = minMaxSet;
    }
  }
}

export const saveLogicHandler = (unformaterDataSet: any[]) => {
  let finalSaveOutput: any = {
    gyde_visibilityrule: null, 
    gyde_documentoutputrule: null,
    gyde_minmaxvalidationrule: null,
  }
  console.log(unformaterDataSet?.length > 0);
  
  if (unformaterDataSet?.length > 0) {
    const unformaterData = unformaterDataSet[0];
    
    const {ifConditionOutput, multipleIfCondtions} = unformaterData // elseConditionOutput
    if (multipleIfCondtions) {
      console.log(multipleIfCondtions.length > 0);
      
      if (ifConditionOutput.length > 0) {
        const ifConditionData = ifConditionOutput[0];
        
        const ifKey = Object.keys(ifConditionData)[0];
        
        const ifArray = ifConditionData[ifKey];        
        ifArray.map((singelIfData: any, index: number) => {
          const {actions, ...rest} = singelIfData[0];          
          if (actions?.options && actions?.options?.length > 0) {
            
            actions?.options.forEach((optionData: any) => {              
              const key = saveRuleLogicalName[optionData];              
              const data = finalSaveOutput[key];
              
              if (data) {
                const keydata = Object.keys(data)[0];
                
                finalSaveOutput[key][keydata].push(rest);
                
              } else {
                finalSaveOutput[key] = {[ifKey]: [rest]};
              }              
            });
          } 
          minMaxHandler(actions, finalSaveOutput)
        });
        return finalSaveOutput;
      } 
      // multiple if end
    } else {
      const ifConditionData = ifConditionOutput[0];
        const {actions, ...rest} = ifConditionData;        
        if (actions?.options && actions?.options?.length > 0) {            
          actions?.options.forEach((optionData: any) => {
            const key = saveRuleLogicalName[optionData];  
            finalSaveOutput[key] = {...rest};                         
          });
        } 
        minMaxHandler(actions, finalSaveOutput)
        return finalSaveOutput;
    }
  }
  return {}
}



// gyde_creationrule  gyde_surveyworkitem  gyde_documentoutputrule  gyde_defaultvalue  gyde_visibilityrule  gyde_minmaxvalidationrule  gyde_validationrule