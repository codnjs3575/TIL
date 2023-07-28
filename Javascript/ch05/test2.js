var createCar = function() {
    var fuel = Math.ceil(Math.random() * 10 + 10); // 연료(L)
    var power = Math.ceil(Math.random() * 3 +2); // 연비(km/L)
    var moved = 0;
    var publicMembers = {
        get moved() { return moved; }, 
					// getter 부여 -> 읽기 전용 속성
        run: function(){
            var km = Math.ceil(Math.random() * 6);
            var wastefuel = km / this.power
            if(fuel < wastefuel){
                console.log('이동불가')
                return;
            }
            fuel -= wastefuel;
            moved += km;
            console.log(km + 'km 이동 (총 ' + moved + 'km)')
        }
    };
    Object.freeze(publicMembers);
    return publicMembers;
};
var car = createCar()

car.run(); // 1km 이동 (총 1km)
console.log(car.moved) // 1
console.log(car.fuel) // undefiend
console.log(car.power) // undefiend

car.fuel = 1000;
console.log(car.fuel) // 1000
car.run(); // 2km 이동 (총 3km)

car.power = 100;
console.log(car.power) // 100
car.run(); // 5km 이동 (총 8km)

car.moved = 1000; // 변경 불가능
console.log(car.moved) // 8
car.run(); // 3km 이동 (총 11km)