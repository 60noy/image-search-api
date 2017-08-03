import {IMAGE_SEARCH_URL,API_KEY} from '../lib/constants';
import axios from 'axios'

export const searchImageByString = (str) => {
  return axios.get(`${IMAGE_SEARCH_URL}${str}`, {headers: { 'Ocp-Apim-Subscription-Key': API_KEY }})
  .then((result) => {
    return result.value.map((item) => {
      return {
        url: item.contentUrl,
        snippet: item.name,
        thumbnail: item.thumbnailUrl,
        context: item.hotpageUrl
      }
    })
  })
}
