const { Wrapper } = require('ebsoc');

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJPbmxpbmUgQ2xhc3MiLCJtZW1iZXJOYW1lIjoi67CV6riI7ZiBIiwibWVtYmVyU2Nob29sQ29kZSI6IkgwMDI4NSIsImV4cCI6MTYyNjE5ODkxMiwiaWF0IjoxNjI1OTM5NzEyLCJtZW1iZXJJZCI6InJtYWd1cjEyMDMyIn0.Wb6_A3kn_AltSzjCg219v0oKYqL8MmsBW5kdmpusSVI";

(async () => {
    let player = new Wrapper.SimplePlayer(
        token,
        "tongsa1a",
        12056
    );
    let data = await player.lectureData();
    console.log(data);
    if (data.err)
        console.log("on error");
    else {
        console.log(data.data);
    }

})();