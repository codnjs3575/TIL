N, M = map(int,input().split())
num_arr = list(map(int,input().split()))
count = 0

for i in range(N):
    sum = 0
    # print(f'i : {i}, num_arr[i] : {num_arr[i]}')
    if num_arr[i] == M :
        count += 1
        pass

    for j in range(i+1,N):
        sum += num_arr[j]
        # print(j,num_arr[j],sum,sum+num_arr[i])
        if (sum+num_arr[i]) == M :
            count += 1
            break
        elif (sum+num_arr[i]) > M:
            break

print(count)



# 1 2 1 3 1 1 1 2