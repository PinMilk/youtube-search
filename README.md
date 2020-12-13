# youtube-search - Unofficial YouTube searching engine.
[![TypeScript](https://img.shields.io/badge/Built%20with-Typescript-informational?logo=typescript)](https://www.typescriptlang.org/)
[![Passed](https://img.shields.io/badge/Build-Passed-success)](#)
[![License](https://img.shields.io/github/license/pinmilk/youtube-search)](#)
- Note: It can stop working anytime.

[![NPM](https://nodei.co/npm/youtube-search-engine.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/youtube-search-engine/)

## Install
```
npm install youtube-search-engine
```
## Github
`https://github.com/PinMIlk/youtube-search`
## npm
`https://www.npmjs.com/package/youtube-search-engine`
## Example
```typescript
import {
    YoutubeSearch
} from './src/search';

YoutubeSearch.execute('비긴어게인')
    .then(res => console.log(res))
    .catch(e => console.error(e));
```
## Parameter
| Parameter | Detail | Type | Required | Default |
| ---- | ---- | ---- | ---- | ---- |
| `query` | Search word | `string` | Y | `-` |
| `language` | Search result language | `string` | N | `en-US` |
### Language code table
| Code | Language |
|----|----|
| `ko-KR` | Korean |
| `en-US` | English(US) |
| `en-GB` | English(US) |
| `ja-JP` | Japanese |
| `zh-CN` | Chinese(Simplified) |
| `zh-TW` | Chinese(Traditional) |
- Tell me other language with issue if you need.
## Return value
### Video
| Key | Detail | Type |
| ---- | ---- | ---- |
| `title` | Title | `string` |
| `author` | Author | `string` |
| `view` | Number of views | `string` |
| `running_time` | Running time | `string` |
| `link` | Video url | `string` |
| `img` | Thumbnail image url | `string` |
| `published_at` | Published time | `string` |
### Channel
| Key | Detail | Type |
| ---- | ---- | ---- |
| `title` | Channel name | `string` |
| `subscribers` | Number of subscribers | `string` |
| `video` | Number of videos | `string` |
| `link` | Channel url | `string` |
| `img` | Thumbnail image url | `string` |
## License
It is following MIT License.