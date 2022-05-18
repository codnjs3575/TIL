import sys
input = sys.stdin.readline
T = int(input())

for _ in range(T):
    N,s,e,k = map(int,input().split())
    num = list(map(int,input().split()))
    num = num[s-1:e]

    # num.sort()
    for i in range(len(num)) :
        for j in range(i+1,len(num)):
            if num[i] >= num[j]:
                num[j],num[i] = num[i],num[j]
    print(num[k-1])
