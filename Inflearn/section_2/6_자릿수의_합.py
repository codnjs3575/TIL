import sys
input = sys.stdin.readline

def digit_sum(x):
    maxsum = 0
    for n in x :
        sum = 0
        for i in str(n):
            sum += int(i)
        if maxsum < sum:
            maxsum = sum
            maxnum = n
    print(maxnum)

N = int(input())
num = list(map(int,input().split()))

digit_sum(num)

