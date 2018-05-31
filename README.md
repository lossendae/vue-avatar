# VueAvatar [![CircleCI](https://circleci.com/gh/lossendae/vue-avatar/tree/master.svg?style=shield&circle-token=0a0d164e1fb6b205fefd64ed825704f57a63e9e9)](https://circleci.com/gh/lossendae/vue-avatar/tree/master)

Avatar component for VueJS 2 

- Use username to create letter avatar (up to 3 chars)
- If an image src is provided, will try to use it as avatar
- Images are lazy loaded. If it is not loaded successfully, it will not be used (letter avatar as fallback) 

## Installation

```
npm install --save @lossendae/vue-avatar
```

## Usage

### ES6

```js 
import Vue from 'vue'
import VueAvatar from '@lossendae/vue-avatar'

// If not installed globally
export default {
    ...
    components: {
        VueAvatar
    },
    ...
}
```

CommonJS

```js
const Vue = require('vue')
const VueAvatar = require('@lossendae/vue-avatar')

// In your component if not installed globally
Vue.extend({
    ...
    components: {
        'vue-avatar': VueAvatar.VueAvatar
    },
    ...
})
```

### Make available globally

```js
Vue.component('vue-avatar', VueAvatar)
```

## Usage

```html
<vue-avatar :username="'Franck Zappatta'" :src="'/path/to/img'"></vue-avatar>
```

## Props

| Name             | Type   | Required | Default                        | Description                                                                  |
| -----------------|--------|:--------:|:------------------------------:| -----------------------------------------------------------------------------|
| **username**     | String | `true`   | -                              | String used for the letter avatar (up to three characters)                   |
| **size**         | Number | `false`  | `50`                           | Size in pixels of the avatar                                                 |
| **src**          | String | `false`  | -                              | Optional image source path to use for the avatar                             |
| **colors**       | Array  | `false`  | `DEFAULT_COLORS[]` (see below) | Pool of colors used for avatar background image (expect array of hsl values) |
| **borderRadius** | Number | `false`  | `50`                           | Value of the border radius for the avatar                                    |
| **customStyles** | Object | `false`  | `{}`                           | Custom style object to merge with the default style                          |


## Default colors

![vue-avatars](https://user-images.githubusercontent.com/345686/40773996-c0b1cb68-64c4-11e8-807b-b9be1a9c9a2d.png)

In you want to override those colors, use the colors props by passing an array of hsl colors

See below the values used for the above example:

```js
const COLORS_HSL = [
    [6, 71, 60],
    [340, 85, 66],
    [291, 49, 60],
    [263, 49, 63],
    [232, 46, 64],
    [218, 93, 67],
    [187, 73, 70],
    [187, 73, 58],
    [175, 43, 50],
    [151, 44, 53],
    [88, 53, 59],
    [66, 73, 59],
    [51, 95, 53],
    [47, 100, 49],
    [40, 100, 50],
    [16, 100, 69],
    [0, 0, 76],
    [201, 17, 62],
    [17, 16, 56],
    [0, 0, 64],
    [233, 47, 79],
    [262, 49, 74],
    [0, 0, 76],
    [187, 73, 70],
    [15, 15, 69],
    [88, 52, 67],
]
```

You can see the component in action [this codesandbox](https://codesandbox.io/s/pk4nvqr0kq)

## License

[MIT](https://github.com/lossendae/vue-avatar/blob/master/LICENSE)
