import sys
sys.stdin=open("input.txt", "r")

def DFS(L):
    lt = 0
    rt = 1
    if L < 0 : return
    else :
        DFS(L-1)

if __name__=="__main__":
    n, f=map(int, input().split())
    res=[0]*n

    cnt=0
    DFS(n)
    print(cnt)