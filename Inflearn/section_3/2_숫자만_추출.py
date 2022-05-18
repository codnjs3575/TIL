import sys
input = sys.stdin.readline

msg = input().replace('\n','')
new = []
count = 0
for x in msg:
    # isdigit-> 모든숫자형태
    # isdecimal -> 0~9사이 숫자
    if x.isdigit():
        new.append(x)
new = int(''.join(new))

for i in range(1,new+1):
    if new % i == 0:
        count += 1

print(new)
print(count)
