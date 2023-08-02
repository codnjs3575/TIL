function solution(ineq, eq, n, m) {
    return eq != "!" ? eval(n+ineq+eq+m) : eval(n+ineq+m)
}
console.log(solution("<", "=", 20, 50))
console.log(solution(">", "!", 41, 78))