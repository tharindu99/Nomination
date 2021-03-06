import { User }  from 'Models';
var joinjs = require('join-js').default;
// join-js usage : https://www.npmjs.com/package/join-js

const resultMaps = [
  {
    mapId: 'userMap',
    idProperty: 'id',
    properties: ['id', 'name']
  }
];


const mapToUserModel = (users) => {
  const mappedUsers = joinjs.map(users, resultMaps, 'userMap', 'user_');

  //just an example how to convert row data object to Model
  return User({
    id: mappedUsers[0].id,
    name: mappedUsers[0].name,
  });
};

export default {
  mapToUserModel,
};
