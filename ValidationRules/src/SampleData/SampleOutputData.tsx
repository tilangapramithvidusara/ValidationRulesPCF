

const sampleOutputData = {
    ifConditions: [
        {
            index: 1,
            blocks: [
                {
                    if: {
                        conditions: [
                            {
                                Row: 0,
                                Expression: '==',
                                Field: 'Question01',
                                Operator: '&&',
                                Value: 'String01',
                            },
                            {
                                Row: 1,
                                expression: '>',
                                Field: 'Question02',
                                Operator: '||',
                                Value: 'String01',
                            }
                        ],
                        actions: {
                            options: ['show', 'hide'],
                            minMax: {
                                min: 'sefie',
                                max: 234,
                        }},
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
                                Row: 0,
                                Expression: '>',
                                Field: 'Question03',
                                Operator: '',
                                Value: 'String01',
                            },
                            {
                                Row: 1,
                                Expression: '>',
                                Field: 'Question03',
                                Operator: '&&',
                                Value: 'String01',
                            },
                            {
                                Row: 2,
                                Expression: '>',
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