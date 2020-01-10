const BaseModel = require('./BaseModel');

class BaseCollection extends BaseModel {
  constructor(config) {
    super(config);
    this.__collection = true;
  }

  fetch() {
    const This = this;
    return new Promise((resolve, reject) => {
      if (This.__config) {
        Object.assign(This, This._stubbedData());
        resolve(This);
      } else {
        reject(new Error(`no configuration given to fetch ${This.constructor.name} model.`));
      }
    });
  }
}

module.exports = BaseCollection;
