import sys
# sys.stdin = open('input.txt', "rt")
input = sys.stdin.readline
# 위, 오른쪽, 아래, 왼쪽 순서
dx = [-1,0,1,0]
dy = [0,1,0,-1]

N = int(input())
arr = [list(map(int,input().split())) for _ in range(N)]

# 가장자리 초기화
arr.insert(0, [0]*N)
arr.append([0]*N)
for x in arr :
    x.insert(0,0)
    x.append(0)

count = 0
for i in range(1,N+1):
    for j in range(1,N+1):
        if all(arr[i][j] > arr[i+dx[k]][j+dy[k]] for k in range(4)):
            count += 1

print(count)


