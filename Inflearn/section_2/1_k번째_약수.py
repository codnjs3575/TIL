import sys
# sys.stdin = open('input.txt', "rt")
input = sys.stdin.readline

n,k = map(int,input().split())
arr = []

for i in range(1,n+1):
    if n % i == 0 :
        arr.append(i)
        if len(arr) == k:
            print(i)
            break
        else :
            pass
if len(arr) < k:
    print(-1)

## 강의 코드
# import sys
# sys.stdin = open("input.txt",'rt')
# n,k = map(int,input().split())
# cnt = 0
# for i in range(1,n+1):
#     if n%1 == 0:
#         cnt += 1
#     if cnt == k:
#         print(i)
#         break
# else :
#     print(-1)
