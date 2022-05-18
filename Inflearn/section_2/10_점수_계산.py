import sys
input = sys.stdin.readline
N = int(input())
num_arr = list(map(int,input().split()))

cnt = 0
sum = 0
for i in range(N):
    if num_arr[i] == 1:
        cnt += 1
        num_arr[i] = cnt
    else :
        cnt = 0
        num_arr[i] = cnt

for num in num_arr:
    sum += num
print(sum)
