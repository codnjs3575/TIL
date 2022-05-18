import sys
sys.stdin=open("input.txt", "r")

def DFS(L):
    global cnt
    if L==m:
        for i in range(m):
            print(res[i], end=' ')
        print()
        cnt+=1
    else:
        # 1, 2, 3, ... , n
        for i in range(1, n+1):
            if L == i : pass
            else :
                res[L]=i
                DFS(L+1)

if __name__=="__main__":
    n, m=map(int, input().split())
    res=[0]*n
    cnt=0
    DFS(0)
    print(cnt)