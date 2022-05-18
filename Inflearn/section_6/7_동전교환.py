import sys
sys.stdin=open("input.txt", "r")

def DFS(L,sum):
    global count
    if L >= count : return
    if sum > m : return
    if sum == m :
        if L < count : count = L
    else :
        for i in range(n):
            DFS(L+1,sum+arr[i])

if __name__=="__main__":
    n = int(input())
    arr = list(map(int,input().split()))
    arr.sort(reverse=True)
    count = 99999999
    m = int(input())
    DFS(0,0)
    print(count)