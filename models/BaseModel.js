class BaseModel {
  constructor(config) {
    this.__config = {};
    Object.assign(this.__config, config);
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

  _stubbedData() {
    return {
      config: this.__config
    };
  }

  static modelWithConfig(config) {
    const Klass = this;
    return new Promise((resolve, reject) => {
      const model = new Klass(config);
      if (!model) {
        reject(new Error(`null ${Klass.name} model`));
        return;
      }

      model.fetch()
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(new Error(err.message));
        });
    });
  }
}

module.exports = BaseModel;
