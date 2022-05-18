import sys
sys.stdin = open('input.txt','rt')
# input = sys.stdin.readline

N,M = map(int,input().split())
arr = list(map(int,input().split()))
arr.sort()

lt = 0
rt = N-1
while lt<= rt:
    mid = (lt+rt) // 2
    if arr[mid] == M:
        print(mid+1)
        break
    elif arr[mid] > M:
        rt = mid - 1
    else :
        lt = mid + 1



