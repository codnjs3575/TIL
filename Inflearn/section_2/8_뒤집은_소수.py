import sys
input = sys.stdin.readline
N = int(input())
# num_arr = list(map(int,input().split()))
num_arr = input().split()

def reverse(x):
    new_num = []
    for i in range(len(x),0,-1):
        new_num.append(x[i-1])
    new_num = ''.join(new_num)
    return int(new_num)

def isPrime(x):
    count = 0
    if x == 1:
        return

    for i in range(1,int(x/2)):
        if x % i == 0 :
            count += 1
    if count <= 1:
        print(x,end=' ')

for num in num_arr:
    isPrime(reverse(num))
    # isPrime(1)