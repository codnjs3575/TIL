import sys
input = sys.stdin.readline

N = int(input())
num_arr = []
for _ in range(N):
    num_arr.append(list(map(int,input().split())))

max = 0
sum3 = 0
sum4 = 0
for i in range(N):
    sum1 = 0
    sum2 = 0
    sum3 += num_arr[i][i]
    sum4 += num_arr[N-1-i][i]

    for j in range(N):
        sum1 += num_arr[i][j]
        sum2 += num_arr[j][i]

    if max <= sum1 : max = sum1
    elif max <= sum2 : max = sum2
if max <= sum3: max = sum3
elif max <= sum4: max = sum4

print(max)


