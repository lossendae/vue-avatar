# VueAvatar

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

Vue.use(VueAvatar)
```

## Why this component

I've used the [vue-avatar](https://github.com/eliep/vue-avatar) and was frustrated for a few reasons:
- The colors pool was not customisable
- The text was not aligned as i like it with the letter avatars
- The images were not lazy loaded, therefore if an image was not found for whatever reason, you get a blank space
- Following the last point, i had to use a wrapper component to check if the image exists before loading vue-avatar
- The component was not reloading correctly upon page change when used in a table for example, because it was not remounted each time (not really the component fault - just a not handled use case)

Since i've made some changes in how the component behave, i thought that i might as well release it as an alternative.

Don't expect this component to reproduce all the features of [vue-avatar](https://github.com/eliep/vue-avatar) component.

## License

[MIT](https://github.com/lossendae/vue-avatar/blob/master/LICENSE)
