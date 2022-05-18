import sys
sys.stdin = open('input.txt','rt')
N = int(input())
arr = list(map(int,input().split()))
new = [0]

print(arr)

# for i in range(N):
#     lt = arr[0]
#     rt = arr[-1]
#     if lt <= rt:
#         if lt >= new[-1]:
#             new.append(lt)
#             arr.pop(0)
#         else :
#             if rt >= new[-1]
#         print('L',end='')
#     elif arr[0] > arr[-1] and new[-1] <= arr[-1] :
#         new.append(arr[-1])
#         arr.pop()
#         print('R',end='')
lt = 0
rt = N-1
last = 0
res = ""
tmp = []
while lt<= rt:
    if arr[lt] > last:
        tmp.append((arr[lt],'L'))
    if arr[rt] > last :
        tmp.append((arr[rt],'R'))
    tmp.sort()
    if len(tmp) == 0: break
    else :
        res = res+tmp[0][1]
        last = tmp[0][0]
        if tmp[0][1] =='L' :
            lt += 1
        else : rt -= 1
    tmp.clear()
print(len(res))
print(res)