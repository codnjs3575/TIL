import sys
input = sys.stdin.readline

N,K = map(int,input().split())
num = list(map(int,input().split()))
num_set = set()

for i in range(N):
    for j in range(i + 1, N):
       for l in range(j + 1, N):
           num_set.add(num[i]+num[j]+num[l])

num = list(num_set)
num.sort(reverse=True)
print(num[K-1])