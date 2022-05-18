import sys
input = sys.stdin.readline

N = int(input())
score = list(map(int,input().split()))

sum = 0
min = 100

for num in score:
    sum += num
avg = round(sum / N)

for i in range(len(score)):
    if abs(avg - score[i]) < abs(min):
        min = avg - score[i]
        student = i
    elif abs(avg - score[i]) == abs(min):
        if avg-score[i] < min : # 음수 > 양수
            min = avg - score[i]
            student = i

print('%d %d'%(avg, student+1))

# 강의 코드--------------------------------------------------
# import sys
# input = sys.stdin.readline
# min = 21470000
# n = int(input())
# a = list(map(int,input().split()))
# ave = round(sum(a)/n)
#
# for idx, x in enumerate(a):
#     tmp = abs(x-ave)
#     if tmp < min :
#         min = tmp
#         score = x
#         res = idx + 1
#     elif tmp == min :
#         if x > score :
#             score = x
#             res = idx + 1
# print(ave,res)