
const features = [
  {
    name: 'f1',
    type: 'ft1'
  },
  {
    name: 'f2',
    type: 'ft1'
  },
  {
    name: 'f3',
    type: 'ft2'
  },
  {
    name: 'f4',
    type: 'ft2'
  },
]

const models = [
  {
    name: 'm1',
    features: [
      'f1',
      'f3',
    ],
  },
  {
    name: 'm2',
    features: [
      'f1',
      'f2',
      'f3',
      'f4',
    ],
  },
]

const pathways = [
  {
    name: 'p1',
  },
  {
    name: 'p2',
  },
  {
    name: 'p3',
  },
  {
    name: 'p4',
  },
  {
    name: 'p5',
  },
  {
    name: 'p6',
  },
  {
    name: 'p7',
  },
  {
    name: 'p8',
  },
  {
    name: 'p9',
  },
  {
    name: 'p10',
  },
]

const suboptions = [
  {
    name: 's1',
    features: [
      'f1',
      'f3',
    ],
    assetTypes: [
      't2',
    ],
  },
  {
    name: 's2',
    features: [
      'f1',
      'f3',
    ],
    assetTypes: [
      't2',
    ],
    pathways: [
      'p1',
    ]
  },
  {
    name: 's3',
    features: [
      'f1',
    ],
    assetTypes: [
      't2',
    ],
    pathways: [
      'p2',
    ]
  },
  {
    name: 's4',
    features: [
      'f1',
      'f2',
      'f3',
      'f4',
    ],
    assetTypes: [
      't1',
      't2',
    ],
  },
  {
    name: 's5',
    features: [
      'f1',
      'f2',
      'f3',
      'f4',
    ],
    assetTypes: [
      't1',
      't2',
    ],
  },
  {
    name: 's6',
    features: [
      'f1',
      'f2',
      'f3',
      'f4',
    ],
    assetTypes: [
      't1',
      't2',
    ],
  },
  {
    name: 's7',
    features: [
      'f1',
      'f2',
      'f3',
      'f4',
    ],
    assetTypes: [
      't1',
      't2',
    ],
  },
  {
    name: 's8',
    features: [
      'f1',
      'f2',
      'f3',
      'f4',
    ],
    assetTypes: [
      't1',
      't2',
    ],
  },
  {
    name: 's9',
    features: [
      'f1',
      'f2',
      'f3',
      'f4',
    ],
    assetTypes: [
      't1',
      't2',
    ],
  },
  {
    name: 's10',
    features: [
      'f1',
      'f2',
      'f3',
      'f4',
    ],
    assetTypes: [
      't1',
      't2',
    ],
  },
  {
    name: 's11',
    features: [
      'f1',
      'f2',
      'f3',
      'f4',
    ],
    assetTypes: [
      't1',
      't2',
    ],
  },
  {
    name: 's12',
    features: [
      'f1',
      'f2',
      'f3',
      'f4',
    ],
    assetTypes: [
      't1',
      't2',
    ],
  },
  {
    name: 's13',
    features: [
      'f1',
      'f2',
      'f3',
      'f4',
    ],
    assetTypes: [
      't1',
      't2',
    ],
  },
  {
    name: 's14',
    features: [
      'f2',
      'f4',
    ],
    assetTypes: [
      't1',
    ],
  },
  {
    name: 's15',
    features: [
      'f1',
    ],
    assetTypes: [
      't2',
    ],
  },
  {
    name: 's16',
    features: [
      'f2',
      'f4',
    ],
    assetTypes: [
      't1',
    ],
  },
]

const options = [
  {
    name: 'o1',
    suboptions: [
      's1',
      's2',
      's3',
    ],
    pathways: []
  },
  {
    name: 'o2',
    suboptions: [
      's4',
      's5',
    ],
    pathways: [
      'p3',
    ]
  },
  {
    name: 'o3',
    suboptions: [
      's6',
      's7',
    ],
    pathways: [
      'p4',
    ]
  },
  {
    name: 'o4',
    suboptions: [
      's8',
      's9',
      's10',
    ],
    pathways: [
      'p5',
      'p6',
      'p7',
    ]
  },
  {
    name: 'o5',
    suboptions: [
      's11',
      's12',
      's13',
      's14',
      's15',
      's16',
    ],
    pathways: [
      'p8',
      'p9',
      'p10',
    ]
  },
]

const assets = [
  {
    name: 'a1',
    model: 'm1',
    options: [
      'o1',
      'o2',
      'o3',
      'o4'
    ],
    partialOptions: [
      'o1'
    ],
    PeriodicOptions: [
      'o4'
    ],
  },
  {
    name: 'a2',
    type: 'm2',
    options: [
      'o2',
      'o3',
      'o4',
      'o5'
    ],
    partialOptions: [],
    PeriodicOptions: [
      'o2'
    ],
  },
  {
    name: 'a3',
    options: [],
  },
  {
    name: 'a4',
    options: [],
  },
  {
    name: 'a5',
    options: [],
  },
  {
    name: 'a6',
    options: [],
  },
  {
    name: 'a7',
    options: [],
  },
  {
    name: 'a8',
    options: [],
  },
  {
    name: 'a9',
    options: [],
  },
]

export {
  features,
  models,
  pathways,
  suboptions,
  options,
  assets
}
