# VueAvatar [![CircleCI](https://circleci.com/gh/lossendae/vue-avatar/tree/master.svg?style=shield&circle-token=0a0d164e1fb6b205fefd64ed825704f57a63e9e9)](https://circleci.com/gh/lossendae/vue-avatar/tree/master)

Avatar component for VueJS 2 

- Use username to create letter avatar (up to 3 chars)
- If an image src is provided, will use it as avatar
- Use lazy loading for the image. If it is loaded successfully, it will not used (letter avatar as fallback) 

## Installation

```
npm install --save @lossendae/vue-avatar
```

Then in your component

```js 
import Vue from 'vue'
import VueAvatar from '@lossendae/vue-avatar'

// To use globally
Vue.component('vue-avatar', VueAvatar)
```

## License

[MIT](https://github.com/lossendae/vue-avatar/blob/master/LICENSE)
