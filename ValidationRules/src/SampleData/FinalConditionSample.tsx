export const finalCondition = [
  {
    "index": 0,
    "blocks": [
      {
        "if": {
          "conditions": [
            {
              "Row": 1,
              "expression": "",
              "Field": "Question01",
              "Operator": "==", //isEqualTo
              "Value": "String01"
            },
            {
              "Row": 2,
              "expression": "or",
              "Field": "Question01",
              "Operator": "==",
              "Value": "String01"
            }
          ],
          "actions": [
            "Show",
            // "Hide"
          ]
        },
        "else": {
          "conditions": [],
          "actions": [
            // "Show",
            "Hide"
          ]
        }
      }
    ]
  },
  {
    "index": 0,
    "blocks": [
      {
        "if": {
          "conditions": [
            {
              "Row": 1,
              "expression": "",
              "Field": "Question01",
              "Operator": "==", //isEqualTo
              "Value": "String01"
            },
            // {
            //   "Row": 2,
            //   "expression": "or",
            //   "Field": "Question01",
            //   "Operator": "==",
            //   "Value": "String01"
            // }
          ],
          "actions": [
            "Show",
            // "Hide"
          ]
        },
        "else": {
          "conditions": [],
          "actions": [
            // "Show",
            "Hide"
          ]
        }
      }
    ]
  }
];