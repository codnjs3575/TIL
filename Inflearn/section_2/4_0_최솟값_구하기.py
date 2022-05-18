arr = [5,3,7,9,2,5,2,6]
min = float('inf')
for i in range(len(arr)):
    if min >= arr[i]:
        min = arr[i]

print(min)