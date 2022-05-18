"""
{1,2,3,4}
{1}{2,3,4}
{1,2}{3,4}
{1,3}{2,4}
{1,4}{2,3}
{1,2,3}{4}
{1,2,4}{3}
{1,3,4}{2}
"""

import sys
sys.stdin = open('input.txt','r')

def DFS(L,sum):
    if sum > total//2 :
        return
    if L == N :
        if sum == (total-sum):
            print("YES")
            sys.exit(0) # 프로그램 종료
    else :
        DFS(L+1, sum+arr[L])
        DFS(L+1, sum)

if __name__ == "__main__":
    N = int(input())
    arr = list(map(int,input().split()))
    total = sum(arr)

    DFS(0,0)

    print("NO")