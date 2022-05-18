import sys
input = sys.stdin.readline
N = int(input())
arr = [0] * (N+1)
count = 0
for i in range(2,N+1):
    if arr[i] == 0 :
        count += 1
        # 강의 : for j in range(i, n+1, i):
        #       arr[j] = 1

        for j in range(1,N):
            if i*j > N:
                break
            arr[i*j] = 1

print(count)
