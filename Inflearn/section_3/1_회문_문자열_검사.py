import sys
input = sys.stdin.readline

N = int(input())
for j in range(N):
    msg = input().upper()
    l = len(msg)-1
    for i in range(l//2):
        if msg[i] != msg[l-i-1]:
            print('#%d NO'%(j+1))
            break
    else:
        print("#%d YES"%(j+1))

# 강의
# import sys
# input = sys.stdin.readline
# n = int(input())
#
# for i in range(n):
#     s = input()
#     s = s.upper()
#     size = len(s)
#     for j in range(size//2):
#         if s[j]!=s[-1-j]:
#             print('#%d NO'%(i+1))
#             break
#     else:
#         print("#%d YES"%(i+1))

# 강의 2
# import sys
# input = sys.stdin.readline
# n = int(input())
#
# for i in range(n):
#     s = input()
#     s = s.upper()
#     if s == s[::-1]:
#         print("#%d YES" % (i + 1))
#     else: print('#%d NO'%(i+1))
