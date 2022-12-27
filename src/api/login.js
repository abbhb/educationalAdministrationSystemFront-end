import request from '../http/request';

export function login(username,password){
    return request({
        url:'/login',
        method:'post',
        data:{
            username:username,
            password:password
        }
    });
}
export function checkToken(){
    return request({
        url:'/login/checkToken',
        method:'get',
        params:{
        }
    });
}
export function loginOut(){
    return request({
        url:'/login/logout',
        method:'get',
        params:{
        }
    });
}
export function pageList(pageNum,pageSize){
    return request({
        url:'/employee/page',
        method:'get',
        params:{
            pageNum:pageNum,
            pageSize:pageSize
        }
    });
}
export function updataforuser(name,age,gender,email){
    return request({
        url:'/updataforuser',
        method:'post',
        data:{
            name:name,
            age:age,
            gender:gender,
            email:email
        }
    });
}
export function getAllCourseInfo(z,banji){
    return request({
        url:'/course/courseinfo',
        method:'post',
        data:{
            banji:banji,
            z:z//周
        }
    });
}
export function getAllCourseInfoThisWeek(){
    return request({
        url:'/course/thisweekcourseinfo',
        method:'get',
        params:{
        }
    });
}
export function deleteCourseById(id){
    return request({
        url:'/course/deletecourseinfobyid',
        method:'post',
        data:{
            id:id
        }
    });
}

export function getMaxWeek(klassid){
    return request({
        url:'/course/courseinfo/maxweek',
        method:'post',
        data:{
            classid:klassid
        }
    });
}
export function getTeacherByCourseId(id){
    return request({
        url:'/teacher/getcourseteacher',
        method:'get',
        params:{
            courseId:id,
        }
    });
}
export function getCascaderList(){
    return request({
        url:'/course/getcascaderlist',
        method:'get',
        params:{
        }
    });
}


export function changePassWord(id,username,password,newpassword,checknewpassword){
    return request({
        url:'/user/changepassword',
        method:'post',
        data:{
            id:id,
            username:username,
            password:password,
            newpassword:newpassword,
            checknewpassword:checknewpassword
        }
    });
}