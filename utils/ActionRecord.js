/**
 * Record recent action in order to not repeat them
 */
class ActionRecord {
  __records;

  addRecord(id, action, time) {
    let rObj = {};

    if (!this.__records.has(id)) {
      this.__records.set(id, rObj)
    } else {
      rObj = this.__records.get(id);
    }

    if (!rObj[action]) rObj[action] = new Set();
    if (rObj[action].has(time)) return false;
    else rObj[action].add(time);
    return true;
  };

  __interval;
  start() {
    this.__records = new Map();
    this.__interval = setInterval(() => {
      // console.log('huehuehu');
      this.__records.clear();
    }, 3000);
  }
}

module.exports = ActionRecord;