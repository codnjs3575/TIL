import sys
sys.stdin = open('input.txt','r')

if __name__=='__main__':
    n = int(input())
    bricks = []
    for i in range(n):
        a,b,c = map(int,input().split())
        bricks.append((a,b,c)) # [(25, 3, 4), (4, 4, 6), (9, 2, 3), (16, 2, 5), (1, 5, 2)]
    bricks.sort(reverse=True) # [(25, 3, 4), (16, 2, 5), (9, 2, 3), (4, 4, 6), (1, 5, 2)]
    dy = [0] * n
    dy[0] = bricks[0][1]
    res = bricks[0][1]
    for i in range(1,n):
        max_h = 0;
        for j in range(i-1,-1,-1):
            if bricks[j][2] > bricks[i][2] and dy[j] > max_h: max_h = dy[j]
        dy[i] = max_h + bricks[i][1]
        res = max(res,dy[i])
    print(res)
