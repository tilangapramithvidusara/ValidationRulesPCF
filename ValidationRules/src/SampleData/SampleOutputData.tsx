

const sampleOutputData = {
    ifConditions: [
        {
            index: 1,
            blocks: [
                {
                    if: {
                        conditions: [
                            {
                                Row: 3,
                                expression: 'isEqualTo',
                                Field: 'Question01',
                                Operator: '&&',
                                Value: 'String01',
                            },
                            {
                                Row: 4,
                                expression: 'graterThan',
                                Field: 'Question02',
                                Operator: '||',
                                Value: 'String01',
                            }
                        ],
                        actions: ['show', 'hide'],
                        minMax: {
                            min: 123,
                            max: 234,
                            value: 'Question01' // This is optional
                        }
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
                                expression: 'LowerThan',
                                Field: 'Question03',
                                Operator: '',
                                Value: 'String01',
                            },
                            {
                                Row: 11,
                                expression: 'LowerThan',
                                Field: 'Question03',
                                Operator: '&&',
                                Value: 'String01',
                            },
                            {
                                Row: 13,
                                expression: 'LowerThan',
                                Field: 'Question03',
                                Operator: '&&',
                                Value: 'String01',
                            }
                        ],
                        actions: ['show', 'hideAndOutput'],
                    },
                },
            ],
        },
    ],
    elseConditions: [{
        conditions: [],
        actions: ['disable', 'show'],
      }],
};

export default sampleOutputData;