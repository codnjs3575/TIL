import sys
# sys.stdin = open("input.txt", 'r')
input = sys.stdin.readline

N=int(input())
n_arr=[list(map(int, input().split())) for _ in range(N)]
M = int(input())
m_arr=[list(map(int, input().split())) for _ in range(M)]
sum = 0

for m in range(M):
    a = m_arr[m][0]-1
    b = m_arr[m][1]
    c = m_arr[m][2]

    for _ in range(c):
        if b == 0:
            n_arr[a].append(n_arr[a].pop(0))
        else :
            n_arr[a][0],n_arr[a][1:] = n_arr[a][-1],n_arr[a][:-1]
            # n_arr[a].insert(0, n_arr[a].pop())

for i in range(N//2):
    n2 = N//2
    # print(i,N-i-1)

    for num in n_arr[i][n2-(n2-i):N-i]:
        sum += num
    for num in n_arr[N-i-1][n2-(n2-i):N-i]:
        sum += num
    # print(n_arr[i][n2-(n2-i):N//2+i],n_arr[N-i-1][:])
    # print()

sum += n_arr[N//2][N//2]
print(sum)


