import sys
sys.stdin = open('input.txt','r')

if __name__=='__main__':
    # n : 보석 종류의 개수, m : 가방에 담을 수 있는 무게
    n,m = map(int,input().split())

    # 무게만큼 zeros 배열생성
    dy = [0] * (m+1)

    for i in range(n):
        # w : 보석의 무게, v : 보석의 가치
        w,v = map(int,input().split())
        for j in range(w, m+1): dy[j] = max(dy[j], dy[j-w]+v)
        print(dy)
print(dy[m])