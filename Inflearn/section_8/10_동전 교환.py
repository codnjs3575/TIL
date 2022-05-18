import sys
sys.stdin = open('input.txt','r')

if __name__=='__main__':
    n = int(input())
    coin=list(map(int,input().split()))
    m = int(input())

    # 최대 1000개로 초기화 (1000원을 1원으로 거슬러 줄 시)
    dy = [1000] * (m+1); dy[0] = 0;

    for i in range(len(coin)):
        for j in range(coin[i],m+1) : dy[j] = min(dy[j], dy[j-coin[i]]+1)
        print(dy)
print(dy[m])