interface User{
    username:string,
    age:number
}
let user:User={
    username:"sneha",
    age:20
}
console.log(user.username)
let num:number[]=[1,2]
num[3]=45;
let word:string[]=["sneha"]
let numstr:number[] | string[]=[];
numstr[0]=1;
numstr[1]="10"

interface Emp{
    id:number,
    ename:string,
    salary:number,
    dep:string,
    getName():string,
    getSalary():number
}
let emp:Emp={
    id:1,
    ename:"ritik",
    salary:2000000,
    dep:"IT",
    getName:function(){
        return this.ename
    },
    getSalary:function(){
        return this.salary
    },
}
console.log(emp.getName());
console.log(emp.getSalary());