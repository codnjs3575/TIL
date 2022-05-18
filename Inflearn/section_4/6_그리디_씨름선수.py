import sys
sys.stdin = open('input.txt','rt')
N = int(input())
player = [tuple(map(int,input().split())) for _ in range(N)]
# for p in player: print(p)
# print()
# player.sort(key=lambda x : (x[1],x[0]))
#
player.sort(reverse=True)
max = 0
count = 0
for k,w in player:
    if max <= w :
        max = w
        count += 1
print(count)