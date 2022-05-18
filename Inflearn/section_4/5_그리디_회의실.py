import sys
sys.stdin = open('input.txt','rt')
n = int(input())
meeting = [tuple(map(int,input().split())) for _ in range(n)]
# meeting = []
# for _ in range(n):
#     s,e = map(int,input().split())
#     meeting.append((s,e))
meeting.sort(key=lambda x : (x[1],x[0])) # 끝나는 시간을 기준으로 정렬
end = 0
count = 0
for s,e in meeting:
    if s >= end :
        end = e
        count += 1

print(count)
