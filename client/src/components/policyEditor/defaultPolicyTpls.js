export const resource = [
  {
    template: `for public:
initial:
active
terminate
  `,
    name: '免费'
  },
  {
    template: `for nodes:
    in initial :
      proceed to <signing> on receiving transaction of 199 to feth10000abc
  `,
    name: '收费'
  }
];

export const presentable = [
  {
    template: `for public:
initial:
active
terminate`,
    name: '免费'
  },
  {
    template: `for public:
    in initial :
      proceed to <signing> on receiving transaction of 199 to feth10000abc
  `,
    name: '收费'
  }
];

export default {
  resource,
  presentable
};
