import sys
sys.stdin = open('input.txt','r')

def DFS(count,sum,tsum):
    global maxnum,total
    if sum +(total-tsum) < maxnum : return
    if sum > C : return
    if count == N :
        if sum >= maxnum :
            maxnum = sum
    else :
        DFS(count+1,sum+arr[count],tsum+arr[count])
        DFS(count+1,sum,tsum+arr[count])

if __name__=='__main__':
    C,N = map(int,input().split())
    arr = [int(input()) for _ in range(N)]
    maxnum = 0
    total = sum(arr)
    DFS(0,0,0)
    print(maxnum)
