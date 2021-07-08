function login(){
    const id = document.getElementById('id').value;
    const password = document.getElementById('password').value;
    console.log(id,password)
    fetch('https://www.ebsoc.co.kr/auth/api/v1/login').then(response => response.json()).then(data => console.log(data));
    
}