function solution(numLog) {
    var n = numLog[0]
    var res = '';

    for(var i = 0; i < numLog.length - 1; i++) {
        var curr = numLog[i];
        var next = numLog[i+1] 

        if(next == curr + 1) res += "w"
        else if(next == curr - 1) res += "s"
        else if(next == curr + 10) res += "d"
        else res += "a"
    }
    return res
 }

 var a = solution([0, 1, 0, 10, 0, 1, 0, 10, 0, -1, -2, -1])
 console.log(a)