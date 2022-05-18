# 강의 코드--------------------------------------------------
import sys
input = sys.stdin.readline
min = 21470000
n = int(input())
a = list(map(int,input().split()))
# ave = round(sum(a)/n) # round는 round_half_even 방식 (round_half_up xx)
ave = int((sum(a)/n) + 0.5)

for idx, x in enumerate(a):
    tmp = abs(x-ave)
    if tmp < min :
        min = tmp
        score = x
        res = idx + 1
    elif tmp == min :
        if x > score :
            score = x
            res = idx + 1
print(ave,res)