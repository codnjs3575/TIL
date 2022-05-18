import sys
sys.stdin = open('input.txt','rt')
N = int(input())
arr = list(map(int,input().split()))
new = [0]*N

for i in range(N):
    for j in range(N):
        if arr[i] == 0 and new[j] == 0:
            new[j] = i+1
            break
        elif new[j] == 0 :
            arr[i] -= 1
for x in new :
    print(x,end=' ')
    