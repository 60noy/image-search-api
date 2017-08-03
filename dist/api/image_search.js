'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchImageByString = undefined;

var _constants = require('../lib/constants');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// search image in Bing api by the provided string
var searchImageByString = exports.searchImageByString = function searchImageByString(str) {
  return _axios2.default.get('' + _constants.IMAGE_SEARCH_URL + str, { headers: { 'Ocp-Apim-Subscription-Key': _constants.API_KEY } }).then(function (result) {
    return result.data.value.map(function (item) {
      return {
        url: item.contentUrl,
        snippet: item.name,
        thumbnail: item.thumbnailUrl,
        context: item.hostPageDisplayUrl
      };
    });
  });
};
//# sourceMappingURL=image_search.js.map