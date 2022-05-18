# 재귀함수와 스택
import sys
sys.stdin = open('input.txt','r')

def DFS(x):
    if x> 0 :
        DFS(x-1)
        print(x,end=" ")

# 메인, 제일 처음 시작
if __name__ =='__main__':
    n = int(input())
    DFS(n) # 재귀함수 호출