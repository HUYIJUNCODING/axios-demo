/**
 * 使用proxy代理实现数据响应化
 *
 */

const toProxy = new WeakMap(); // 存放  key: 原始对象(当前对象),value:代理后的对象 对应关系
const toRaw = new WeakMap(); // 与上面刚好相反 代理后对象 : 原始对象

const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(target, key) {
  return hasOwnProperty.call(target, key);
}

function isObject(val) {
  return val !== null && typeof val === "object";
}

/**
 * 这是第一步，实现数据的劫持
 */
function reactive(target) {
  return createReactiveObject(target);
}

function createReactiveObject(target) {
  if (!isObject(target)) {
    return target;
  }
  // 目标已经被代理过了
  const observed = toProxy.get(target);
  if (observed) {
    return observed;
  }
  // 防止被重复proxy(已经是proxy类型的不能再次被代理)
  if (toRaw.has(target)) {
    return target;
  }

  const handlers = {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
        console.log(target[key])
      // 进行依赖收集,在第一次调用effect的时候，会触发一次target的get方法的,此时我们将依赖的关系建立
      track(target, key);

      // 如果是target是多级的数据结构，需要递归代理
      return isObject(res) ? reactive(res) : res;
    },
    set(target, key, value, receiver) {
      let oldValue = target[key];
      //result :true/fasle,表示set的结果
      const result = Reflect.set(target, key, value, receiver);

      if (!hasOwn(target, key)) {
        //新增属性
        trigger(target, "add", key);
        // 修改属性(oldValue !== value 为了避免无用set,只需要当新值和旧值不一样的时候,才触发数据更新)
      } else if (oldValue !== value) {
        trigger(target, "set", key);
      }

      return result;
    },
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key);
      const result = Reflect.deleteProperty(target, key); 
      if (result && hadKey) {
        trigger(target, "delete", key);
      }
      return result;
    },
  };

  const observe = new Proxy(target, handlers);

  //建立 原始对象->代理对象的映射表
  toProxy.set(target, observe);
  //建立 代理对象->原始对象的映射表
  toRaw.set(observe, target);

  return observe;
}
// 栈数组，先进后出
/**
 * 依赖收集 (数据: [effect])
 * 每个数据对应它的依赖，数据变更就会执行方法
 */
const effectStack = [];
const targetMap = new WeakMap();
function track(target, key) {
  let activeEffect = effectStack[effectStack.length - 1];
  if (!activeEffect) return;

  let depsMap = targetMap.get(target);

  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let deps = depsMap.get(key);
  if (!deps) {
    deps = new Set();
    depsMap.set(key, deps);
  }
  if (!deps.has(activeEffect)) {
    deps.add(activeEffect);
  }
}

/**
 * 依赖的触发
 */
function trigger(target, type, key) {
  // 这里先不做type的区分
  const depsMap = targetMap.get(target);
  console.log(depsMap,'xx')
  if (depsMap) {
    const deps = depsMap.get(key);
    if (deps) {
     
      deps.forEach((effect) => {
        effect();
      });
    }
  }
}

/**
 * 第二步，实现数据的响应式
 * 数据变更通知依赖的数据更新
 *
 * 副作用，先会执行一次，当数据变化的时候再执行一次
 * 这里面涉及到一个依赖收集的东西，源码里面用一个栈(数组[])来做的
 *
 */
function effect(fn) {
  const effectFun = createReactiveEffect(fn);
  effectFun();
}

function createReactiveEffect(fn) {
  const effect = function() {
    run(effect, fn);
  };
  return effect;
}

function run(effect, fn) {
  try {
    // 栈里面已经拿到数据了以后，清掉保证数据量
    // try 保证fn执行报错时，一定能将栈清除
    effectStack.push(effect);
    fn();
  } finally {
    effectStack.pop(effect);
  }
}
let proxy = reactive({ name: "vue3.0", arr: [{ age: 13 }] });
effect(() => {
  console.log(proxy.name)
  


})
proxy.arr[0].age = 100;
