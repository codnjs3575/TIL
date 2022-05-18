import sys
sys.stdin = open('input.txt','r')

def DFS(v):
    if v == N+1 :
        for i in range(1,N+1):
            if check[i] == 1 :
                print(i,end=' ')
        print()
    else :
        check[v] = 1
        DFS(v + 1)
        check[v] = 0
        DFS(v + 1)


if __name__ == '__main__':
    N = int(input())
    check = [0] * (N+1)
    DFS(1)