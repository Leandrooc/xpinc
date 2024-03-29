const findAndCount = [
  [{
    id: 1,
    name: 'XPX',
    quantity: 6,
    value: '1.000000',
  },
  {
    id: 2,
    name: 'XPI',
    quantity: 10,
    value: '3.000000',
  }],
  2,
];

const getAssetsExpectedResult = {
  numberOfAssets: 2,
  assets: [{
    id: 1, name: 'XPX', quantity: 6, value: '1.000000',
  }, {
    id: 2, name: 'XPI', quantity: 10, value: '3.000000',
  }],
};

const findOne = {
  id: 1,
  name: 'XPX',
  quantity: 6,
  value: '1.000000',
};

export default {
  findAndCount,
  getAssetsExpectedResult,
  findOne,
};
