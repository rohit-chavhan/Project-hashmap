class LinkedList {
  constructor() {
    this.head = null;
  }
}
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}
class HashMap {
  constructor(size = 16) {
    this.capacity = new Array(size);
  }

  loadFactor(num = 0.75) {
    return num;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity.length;
    }
    return hashCode;
  }
  reHashing(oldRay) {
    let newRaySize = new Array(oldRay.length * 2);
    for (let i = 0; i < oldRay.length; i += 1) {
      if (oldRay[i] !== undefined) {
        let basket = oldRay[i].head;

        while (basket !== null) {
          let getHash = this.hash(basket.key);
          let addingList = newRaySize[getHash];
          if (addingList === undefined) {
            addingList = new LinkedList();
            addingList.head = new Node(basket.key, basket.value);
            newRaySize[getHash] = addingList;
          } else {
            let current = addingList.head;
            while (current.nextNode !== null) {
              current = current.nextNode;
            }
            current.nextNode = new Node(basket.key, basket.value);
          }
          basket = basket.nextNode;
        }
      }
    }
    return newRaySize;
  }
  set(key, value) {
    let filledIndexes = this.capacity.reduce((accu, elm) => {
      if (elm !== undefined) {
        accu += 1;
      }
      return accu;
    }, 0);

    let loadLimit = this.capacity.length * this.loadFactor();
    if (filledIndexes >= loadLimit) {
      const holdingArraySize = this.capacity;
      this.capacity = this.capacity.concat(new Array(16));
      let newRay = this.reHashing(holdingArraySize);
      this.capacity = newRay;
    }

    let hashCode = this.hash(key);
    if (hashCode < 0 || hashCode >= this.capacity.length) {
      throw new Error('Trying to access index out of bound');
    }

    if (this.capacity[hashCode] === undefined) {
      this.capacity[hashCode] = new LinkedList();
      this.capacity[hashCode].head = new Node(key, value);
    } else {
      let x = this.capacity[hashCode].head;
      let previousNode;
      while (x !== null) {
        if (x.key === key) {
          x.value = value;
          return;
        } else {
          previousNode = x;
          x = x.nextNode;
        }
      }
      previousNode.nextNode = new Node(key, value);
    }
  }
  get(key) {
    let getIndex = this.hash(key);
    if (this.capacity[getIndex] === undefined) return false;
    let basket = this.capacity[getIndex].head;

    while (basket !== null) {
      if (basket.key === key) {
        return basket.value;
      } else {
        basket = basket.nextNode;
      }
    }
  }

  has(key) {
    let b = this.get(key);

    if (b === null) {
      return false;
    }
    return true;
  }

  remove(key) {
    let x = this.has(key);
    if (x === false) return false;

    let previousNode = 0;

    let findIndex = this.hash(key);
    let basket = this.capacity[findIndex].head;
    while (basket !== null) {
      if (basket.key === key) {
        if (previousNode === 0) {
          let k = basket.value;
          this.capacity[i].head = basket.nextNode;
          return k;
        }
        previousNode.nextNode = basket.nextNode;
        return basket.value;
      } else {
        previousNode = basket;
        basket = basket.nextNode;
      }
    }
  }
  length() {
    let size = 0;

    for (let i = 0; i < this.capacity.length; i += 1) {
      if (this.capacity[i] !== undefined) {
        let current = this.capacity[i].head;
        while (current !== null) {
          current = current.nextNode;
          size += 1;
        }
      }
    }
    return size;
  }
  clear() {
    this.capacity = new Array(16);
  }

  keys() {
    let ray = [];
    for (let i = 0; i < this.capacity.length; i += 1) {
      if (this.capacity[i] !== undefined) {
        let current = this.capacity[i].head;
        while (current !== null) {
          ray.push(current.key);
          current = current.nextNode;
        }
      }
    }
    return ray;
  }

  values() {
    let ray = [];
    for (let i = 0; i < this.capacity.length; i += 1) {
      if (this.capacity[i] !== undefined) {
        let current = this.capacity[i].head;
        while (current !== null) {
          ray.push(current.value);
          current = current.nextNode;
        }
      }
    }
    return ray;
  }

  entries() {
    let keyRay = this.keys();
    let valueRay = this.values();

    let array = [];

    for (let i = 0; i < keyRay.length; i += 1) {
      let x = [];
      x.push(keyRay[i], valueRay[i]);
      array.push(x);
    }

    return array;
  }
}

const test = new HashMap(); // or HashMap() if using a factory
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('lion', 'grasland');
test.set('lions', 'grasland');
test.set('s', 'grasland');
test.set('re', 'grasland');
test.set('er', 'grasland');
test.set('er', 'grasland');
test.set('moon', 'silver');
test.set('revan', 'silver');
test.set('teslas', 'silver');
test.set('justin Bieber', 'silver');
console.log(test);
