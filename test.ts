import {
    YoutubeSearch
} from './src/search';

YoutubeSearch.execute('비긴어게인')
    .then(res => console.log(res))
    .catch(e => console.error(e));
