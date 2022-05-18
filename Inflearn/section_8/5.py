import sys
sys.stdin = open('input.txt','r')

N = int(input())
arr = list(map(int,input().split()))
arr.insert(0,0) # [0, 5, 3, 7, 8, 6, 2, 9, 4]

dy = [0] * (N+1)
dy[1] = 1 # [0, 1, 0, 0, 0, 0, 0, 0, 0]
res = 0

for i in range(2,N+1):
    max = 0
    for j in range(i-1,0,-1):
        if arr[j] < arr[i] and dy[j] > max : max = dy[j]
        dy[i] = max + 1
        if dy[i] > res : res = dy[i]
print(res)