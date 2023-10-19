import { API_BASE_URL } from "../app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";
const ACCESS_USERNAME = "ACCESS_USERNAME";

export function call(api, method, request) {
    let headers = new Headers({
        "Content-Type": "application/json",
    });

    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if(accessToken) {
        headers.append("Authorization","Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };

    if(request) {
        options.body = JSON.stringify(request);
    }

    return fetch(options.url, options)
        .then( (response)=>
            response.json().then( (json)=>{
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        )
        .catch( (error)=>{
            console.log("Oops!")
            console.log(error.status);
            console.log("Oops!")
            if(error.status === 403) {
                window.location.href = "/login";
            }
            return Promise.reject(error);
        });
}

//로그인을 위한 API서비스 메소드 SignIn
export function signin(userDTO) {
    return call("/auth/signin", "POST", userDTO)
    .then( (response) => {
        if(response.token) {
            //local스토리지에 토큰 저장
            localStorage.setItem("ACCESS_TOKEN", response.token);

            if(response.companyName != null)
                localStorage.setItem("ACCESS_USERNAME", "["+response.companyName+"]"+ " "+response.userName);
            else
                localStorage.setItem("ACCESS_USERNAME", response.userName);
            //token이 존재하는 경우 todo 화면으로 이동
            window.location.href = "/";
        }
    });
}

//회원 가입 요청
export function signup(userDTO) {
    return call("/auth/signup", "POST", userDTO)
    .then( (response) => {
        if(response.id) {
            window.location.href = "/";
        }
    })
    .catch( (error) => {
        console.log("Oops!"); 
        console.log(error.status); 
        console.log("Ooops!")
        
        if(error.status === 403) { 
            window.location.href = "/auth/signup"; 
        } 
        
        return Promise.reject(error);
    });
}

//회원정보수정
export function userEdit(userDTO){
    return call("/auth/useredit", "POST", userDTO)
            .then( (response)=>{
                if(response.id) {
                    window.location.href = "/";
                }
            });
}
//회원정보수정 페이지 길잡이
export function userEditRoute(){
    window.location.href = "/useredit";
}

//회원탈퇴
export function userDelete(userDTO){
    return call("/auth/userdelete", "POST", userDTO)
}

//로그아웃
export function signout() {
    //local 스토리지에 토큰 삭제
    localStorage.setItem("ACCESS_TOKEN", null);
    localStorage.setItem("ACCESS_USERNAME", null);
    window.location.href = "/";
}