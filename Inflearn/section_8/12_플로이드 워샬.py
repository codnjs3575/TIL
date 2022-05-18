import sys
sys.stdin = open('input.txt','r')

if __name__=='__main__':
    n,m = map(int,input().split())
    # 최대 거리 5000으로 배열 초기화
    dis = [[5000] * (n+1) for _ in range(n+1)]

    # 자기 자신과의 거리는 0으로 배열 수정
    for i in range(1,n+1) : dis[i][i] = 0

    # input.txt에 있는 거리값(i->j로 바로가는 거리)으로 배열 수정
    for i in range(m):
        a,b,c = map(int,input().split())
        dis[a][b] = c

    # k를 통하는 거리와 i->j로 바로가는 거리 중 min값 선택하여 배열 수정
    for k in range(1, n+1):
        for i in range(1, n+1):
            for j in range(1, n+1):
                # if i == j : break;
                dis[i][j] = min( dis[i][j], dis[i][k]+dis[k][j] )
                # print(f'k = {k}, dis[{i}][{j}]({dis[i][j]}) = min(dis[{i}][{j}]({dis[i][j]}), dis[{i}][{k}]({dis[i][k]}) + dis[{k}][{j}]({dis[k][j]}) )')
            # print()
        print(f'k={k}')
        for d in dis[1:] : print(d[1:])
    # for d in dis[1:] : print(d[1:])
    # k i j
    # k = 1 , i = 1, j = 1 ~ n
    # k = 1 , i = 2, j = 1 ~ n
    # k = 2 , i = 1, j = 1 ~ n

    # 배열 출력
    # for i in range(1, n+1):
    #     for j in range(1, n+1):
    #         if dis[i][j] == 5000 : print('M', end = ' ')
    #         else : print(dis[i][j], end=' ')
    #     print()
