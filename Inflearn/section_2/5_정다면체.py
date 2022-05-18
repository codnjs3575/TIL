import sys
input = sys.stdin.readline
N, M = map(int,input().split())
num_dict = dict()
num_arr = list()
max = 0

for n in range(1,N+1):
    for m in range(1,M+1):
        c = n+m
        if c in num_dict:
            num_dict[c] += 1
        else :
            num_dict[c] = 1

for val in num_dict.values():
    if val > max :
        max = val

for key,val in num_dict.items():
    if val == max :
        num_arr.append(key)

for num in num_arr:
    print(num,end=' ')


