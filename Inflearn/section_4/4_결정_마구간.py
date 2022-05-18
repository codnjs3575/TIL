import sys
sys.stdin = open('input.txt','rt')
def Count(mid):
    count = 1
    end = x[0]
    for i in range(1,N):
        if x[i]-end >= mid :
            count += 1
            end = x[i]
    return count

N, C = map(int,input().split())
x= [int(input()) for _ in range(N)]
x.sort()
lt = 1
rt = x[-1]
while lt <= rt :
    mid = (lt+rt) // 2
    if Count(mid) >= C :
        res = mid
        lt = mid+1
    else :
        rt = mid-1

print(res)