// readline으로 사용하는 방법

//한 개의 입력(띄어쓰기x)
/*
function solution(input){
    console.log(input);
}

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let input;
rl.on("line", function(line){
    input = line;
    // input = parseInt(line); // 입력 값이 정수라면 parseInt로 형변환
    rl.close();
}).on("close", function(){
    solution(input);
    process.exit();
})
*/

//한 줄의 입력(띄어쓰기 o , 예를 들면 1 2 3 4 5)
/*
function solution(input){
    const [a,b] = input;
    const answer = a+b;
    console.log(answer);
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let input;
let list = [];
rl.on('line', function(line) {
    input = line;
    rl.close();
}).on("close", function() {
    // list = input.split(' ').map((el) => el); 
    list = input.split(' ').map((el) => parseInt(el)); // 입력값이 정수라면 parseInt로 형 변환
    solution(list);
    process.exit();
});
*/

//여러줄  입력시(n, input)
/*
function solution(n, input) {
    console.log(n);
    console.log(input);
}

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let input = [];
rl.on("line", function(line) {
    input.push(line)
    //rl.close()가 없어서 계속 입력
    //로컬에서 입력을 중지하려면 입력을 한 후 ctrl+d로 입력 종료
}).on("close", function() {
    let n = parseInt(input[0]);
    let list = input[1].split(' ').map((el) => parseInt(el));
    solution(n, list);
    process.exit();
});
*/

//여러줄 입력시(input1, input2)
/*
function solution(input1, input2) {
    console.log(input1);
    console.log(input2);
}

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let input = [];
rl.on("line", function(line) {
    input.push(line)
    //rl.close()가 없어서 계속 입력
    //로컬에서 입력을 중지하려면 입력을 한 후 ctrl+d로 입력 종료
}).on("close", function() {
    let list1 = input[0].split(' ').map((el) => parseInt(el));
    let list2 = input[1].split(' ').map((el) => parseInt(el));
    solution(list1, list2);
    process.exit();
});
*/