import sys
input = sys.stdin.readline
arr = []
sum = 0
N = int(input())
for _ in range(N):
    arr.append(list(map(int, input().split())))

for i in range(N//2):

    for num in arr[i][N // 2 - i: N // 2 + i + 1]:
        sum += num
    for num in arr[N-i-1][N//2-i : N//2+i+1]:
        sum += num
for n in arr[N//2]:
    sum += n

print(sum)