import { getNamespace } from 'continuation-local-storage';
import Sequelize from 'sequelize';

const session = getNamespace('api-session');
Sequelize.cls = session;

const singleton = Symbol('singleton');
const singletonEnforcer = Symbol('singletonEnforcer');

class DataSourceFactory {
  /**
   * @param enforcer
   */
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton');
    }
    //this.dbConnection = new Sequelize('EC_NOMINATION', 'root', 'root');
    this.dbConnection = new Sequelize('heroku_f5d01a537b411d3', 'b8dc7e945d8941', '4d3ac423' ,{
      host: 'us-cdbr-iron-east-03.cleardb.net',
    });
  }

  /**
   * @returns DataSourceFactory
   */
  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new DataSourceFactory(singletonEnforcer);
    }
    return this[singleton];
  }

}

const DbConnection = () => {
  return DataSourceFactory.instance.dbConnection;
};

export {
  DbConnection,
};
