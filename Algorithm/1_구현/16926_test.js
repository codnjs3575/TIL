let n, m
n = 2
m = 4
let printS = ''
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= m; j++) {
    printS += `[${i}][${j}]  `
  }
  console.log(printS)
  printS = ''
}
console.log()
