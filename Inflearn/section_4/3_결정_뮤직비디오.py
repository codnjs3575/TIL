import sys
sys.stdin = open('input.txt','rt')
N,M = map(int,input().split())
def cnt(mid):
    count = 1
    sum = 0
    for n in arr:
        if (sum+n) > mid:
            count += 1
            sum = n
        else :
            sum += n
    return count

arr = list(map(int,input().split()))
maxx = max(arr)
lt = 1
rt = sum(arr)
res = 0

while lt <= rt :
    mid = (lt+rt)//2

    if mid>=maxx and cnt(mid) <= M:
        res = mid
        rt = mid - 1
    else :
        lt = mid + 1
        # count = 1

print(res)
