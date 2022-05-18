import sys
sys.stdin = open('input.txt','rt')
N, M = map(int,input().split())
arr = list(map(int,input().split()))
arr.sort()
count = 0

for i in range(N):
    if len(arr) == 1:
        count += 1
        break
    elif len(arr) == 0 :
        break

    if arr[-1] + arr[0] > M :
        arr.pop()
        count += 1
    else :
        arr.pop()
        arr.pop(0)
        count += 1

print(count)