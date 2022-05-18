import sys
input = sys.stdin.readline

N = int(input())
arr1 = list(map(int,input().split()))
M = int(input())
arr2 = list(map(int,input().split()))
new = [0]
cnt1,cnt2 = 1,0

if arr1[0] >= arr2[0] :
    new[0] = arr2[0]
    arr2, arr1 = arr1, arr2
    N, M = M, N

else : new[0] = arr1[0]

while True :
    if arr1[cnt1] >= arr2[cnt2]:
        new.append(arr2[cnt2])
        cnt2 += 1
    else:
        new.append(arr1[cnt1])
        cnt1 += 1

    if (cnt1 == N) :
        for i in range(cnt2,M):
            new.append(arr2[i])
        break

    elif cnt2 == M :
        for i in range(cnt1,N):
            new.append(arr1[i])
        break

for num in new:
    print(num,end=" ")
