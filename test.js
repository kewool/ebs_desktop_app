const { Wrapper } = require('ebsoc');

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJPbmxpbmUgQ2xhc3MiLCJtZW1iZXJOYW1lIjoi67CV6riI7ZiBIiwibWVtYmVyU2Nob29sQ29kZSI6IkgwMDI4NSIsImV4cCI6MTYyNjEwMDg4MCwiaWF0IjoxNjI1ODQxNjgwLCJtZW1iZXJJZCI6InJtYWd1cjEyMDMyIn0.HLHzHU0ujUy1nyRm3OolHp5sfuMULOhoGMt_FGIfpEM";

(async () => {
    let data = await Wrapper.fetchCourse(
        token,
        "2021sunrinmath01hak",
        {
            status: Wrapper.COURSE_STATUS.ALL,
            orderBy: Wrapper.COURSE_ORDER_BY.REGISTRATION_DATE
        }
    );
    console.log(data);
    if (data.err)
        console.log("on error");
    else {
        console.log(data.data);
    }

})();