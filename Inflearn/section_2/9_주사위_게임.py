import sys
input = sys.stdin.readline
N = int(input())
num_arr = []
money = 0

for _ in range(N):
    num_arr.append(list(map(int,input().split())))

for num in num_arr:
    l = len(set(num))
    max = 0
    if l == 3:
        for x in num:
            if max <= x : max = x
        max = max*100
        if money <= max : money = max
    elif l == 2:
        for x in set(num):
            if num.count(x) == 2: max = x
        max = 1000+max*100
        if money <= max : money = max
    else :
        max = num[0]
        max = 10000+(max*1000)
        if money <= max : money = max

print(money)
