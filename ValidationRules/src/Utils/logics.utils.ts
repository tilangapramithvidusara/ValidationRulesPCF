export const generateJsonHandler = (dataArray: any[]) => {
  let finalData: { ifblock: { logic: { [x: number]: {}; }; actions: any; } | { logic: {}; actions: any; }; elseBlock: { logic: {}; actions: any; } | { logic: {}; actions: any; }; }[] = [];
  dataArray.map((data: object) => {
      const {index, blocks}: any = data;
      if (blocks.length > 0) {
          console.log("block =====> ", blocks, index);
          blocks.map((blockData: any) => {
              if (blockData?.if) {
                  const {if: {conditions, actions}} = blockData;

                  if (conditions.length > 0) {
                      if (conditions.length > 1) {
                          const expressions: any = [];
                          const condtionalDataArray: {}[] = [];
                          let ifJsonObject = {};
                          let elseJsonObject = {};
                          conditions.map((conditionData: any, conditionIndex: number) => {
                              const operator = conditionData?.Operator;
                              const question = conditionData?.Field;
                              const value = conditionData?.Value;
                              const expression = conditionData?.expression;
                              if (expression) expressions.push(expression);
                              ifJsonObject = {
                                  [operator]: [{var: question}, value],
                              }
                              condtionalDataArray.push(ifJsonObject);
                          });
                          finalData.push({
                              ifblock: {
                                  logic: {
                                      [expressions[0]]: condtionalDataArray,
                                  },
                                  actions: actions,
                              },
                              elseBlock: {
                                  logic: elseJsonObject,
                                  actions: blockData?.else?.actions,
                              }
                          });
                      } else {
                          let ifJsonObject = {};
                          let elseJsonObject = {};
                          const operator = conditions[0]?.Operator;
                          const question = conditions[0]?.Field;
                          const value = conditions[0]?.Value;
                          ifJsonObject = {
                              [operator]: [{var: question}, value],
                          }
                          if (blockData?.else?.actions?.length > 0) {
                              const notOperator = `!${operator}`;
                              elseJsonObject = {
                                  [notOperator]: [{var: question}, value],
                              }
                          }
                          finalData.push({
                              ifblock: {
                                  logic: ifJsonObject,
                                  actions: actions,
                              },
                              elseBlock: {
                                  logic: elseJsonObject,
                                  actions: blockData?.else?.actions,
                              }
                          });
                      }
                  }
              }
          });
          
      }
  });
  return finalData;
}