const { Wrapper } = require('ebsoc');

(async () => {
    let data = await Wrapper.fetchUserData("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJPbmxpbmUgQ2xhc3MiLCJtZW1iZXJOYW1lIjoi67CV6riI7ZiBIiwibWVtYmVyU2Nob29sQ29kZSI6IkgwMDI4NSIsImV4cCI6MTYyNjA2NDk2OSwiaWF0IjoxNjI1ODA1NzY5LCJtZW1iZXJJZCI6InJtYWd1cjEyMDMyIn0.Yp05rAMqzzLkTtmlIECbxbReFza6AbjfV3c-u7dDpIA");
    if (data.err)
        console.log("on error");
    else {
        console.log(data.data);
    }
    
})();