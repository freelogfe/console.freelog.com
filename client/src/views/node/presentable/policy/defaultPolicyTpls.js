export default [
  {
    template: `for public:
    in <init> : terminate
  `,
    name: '免费'
  },
  {
    template: `for public:
    in initial :
      proceed to <signing> on receiving transaction of 199 to feth10000abc
  `,
    name: '收费'
  }
]
