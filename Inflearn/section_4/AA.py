import sys
# sys.stdin = open('input.txt','rt')
input = sys.stdin.readline

N,M = map(int,input().split())
arr = list(map(int,input().split()))
lt = 1
rt = max(arr)
res = 0

while lt <= rt :
    count = 0
    mid = (lt + rt) //2

    for num in arr :
        count += num//mid

    if count >= N :
        res = mid
        lt = mid + 1
    else : rt = mid - 1

print(res)