import sys
sys.stdin = open('input.txt','r')

def dfs(n):
    if arr[n] != 0 :
        return arr[n]
    else :
        arr[n] = dfs(n-1) + dfs(n-2)
        return arr[n]


if __name__ == "__main__":
    n = int(input())
    arr = [0] * (n+1)
    arr[1] = 1
    arr[2] = 2
    print(dfs(n))
