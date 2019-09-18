export const objectUtils =  {
    //获取对象较深层级属性，不抛出异常
    get(object, key) {
        if (object) {
            let keys = key.split(".");
            let index = 0;
            let value = object;
            while (value && index < keys.length) {
                value = value[keys[index]];
                index++;
            }
            if (value && index == keys.length) {
                return value;
            }
        }
    },
    set(object, key, value) {
        if (object) {
            let keys = key.split(".");
            let index = 0;
            let current = object;
            while (index < keys.length) {
                let o = current[keys[index]];
                if (!o) {
                    o = {};
                    current[keys[index]] = o;
                }
                if (index < keys.length - 1) {
                    current = o;
                }
                else {
                    current[keys[index]] = value;
                }
                index++;
            }
            return object;
        }
    }
};
