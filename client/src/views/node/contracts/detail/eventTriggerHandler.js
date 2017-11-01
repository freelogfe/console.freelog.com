import Fetch from '@/services/fetch'
let eventTriggerHandlerMap = {
  signing (licenseArr) {
    let promiseArr = [];
    //显示所有License
    licenseArr.forEach((url)=> {
      let temp = new Fetch('urlForLicense').get(url)
      promiseArr.push(temp)
    })
    return Promise.all(promiseArr)
  },
  period () {
    
  }
};

export default eventTriggerHandlerMap;
