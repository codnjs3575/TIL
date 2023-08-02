const readline = require("readline");

const rl = readline.createInterface({
  // 모듈을 이용해 입출력을 위한 인터페이스 객체 생성
  input: process.stdin,
  output: process.stdout,
});

  rl.on("line", (line) => { 
     console.log('input: ', line);
      rl.close(); // close가 없으면 입력을 무한히 받는다.
  });
  rl.on('close', () => {
    // 입력이 끝난 후 실행할 코드
    process.exit()
  })

// console.log('on')
