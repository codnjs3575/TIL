var extendClass1 = function(SuperClass, SubClass, subMethods) {
    SubClass.prototype = new SubClass();
    for (var prop in SubClass.prototype) {
        if(SubClass.prototype.hasOwnProperty(prop)) {
            delete SubClass.prototype[prop] // 프로퍼티 제거
        }
    }

    if(subMethods){
        for(var method in subMethods){
            SubClass.prototype[method] = subMethods[method];
        }
    }

    Object.freeze(SubClass.prototype);
    return SubClass;
};

var Square= extendClass1(Reactangle, function(width){
    Reactangle.call(this, width, width)
})