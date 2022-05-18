import sys
input = sys.stdin.readline
num_arr = [i for i in range(1,21)]

for _ in range(10):
    A,B = map(int,input().split())
    C = B-A+1
    for i in range(1,C//2+1):
        num_arr[A+i-2], num_arr[B-i] = num_arr[B-i], num_arr[A+i-2]

for num in num_arr :
    print(num,end=" ")