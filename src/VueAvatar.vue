<template>
    <transition name="vue-avatar" mode="out-in">
        <div class="vue-avatar" :style="style" :key="loaded_src">
            <span v-if="!image_exists">{{ initials }}</span>
        </div>
    </transition>
</template>

<script>
    /**
     * Inspired by https://github.com/ksz2k/letter_avatar
     *
     * @type {*[]}
     */
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

    export default {
        props: {
            /**
             * Accept arrays in order to give the correct initials for composed names
             */
            username: {
                type: String,
                required: true,
            },
            /**
             * Size of the avatar in pixels
             */
            size: {
                type: Number,
                default: 50,
            },
            /**
             * Optional image for avatar, will be used as background image if supplied
             */
            src: {
                type: String,
            },
            /**
             * An array of colors used for the letter avatar
             * Each are used as HSL placeholders allowing to set the background color and text color easily
             */
            colors: {
                type: Array,
                default() {
                    return COLORS_HSL
                },
            },
            /**
             * Value use to make the avatar round or square, used as percentage
             */
            borderRadius: {
                type: Number,
                default: 50,
            },
            /**
             * Custom style object to merge with the default style
             */
            customStyles: {
                type: Object,
                default() {
                    return {}
                },
            },
            /**
             * Specify the delay in milliseconds to wait before attempting to load the image src
             * This allows to show the letter avatar for the given time and then eventually load the image
             * Can be useful when used in combination with transition
             */
            delay: {
                type: Number,
                default: 0,
            },
        },
        data() {
            return {
                loaded_src: null,
                image_exists: false,
            }
        },
        computed: {
            /**
             * Only keep the first three extracted letters from the initials
             */
            initials() {
                return this.format(this.username.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g)).join('').toUpperCase().substr(0, 3)
            },
            /**
             * Set inline styles
             */
            style() {
                const [hue, saturation, lightness] = this.background_color
                const text_lightness = lightness < 60 ? lightness - 20 : lightness + 25

                const default_styles = {
                    display: 'inline-flex',
                    backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                    color: `hsl(${hue}, ${saturation}%, ${text_lightness}%)`,
                    fontWeight: 'bold',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: this.borderRadius + '%',
                    lineHeight: '1',
                    width: this.size + 'px',
                    maxWidth: this.size + 'px',
                    height: this.size + 'px',
                    maxHeight: this.size + 'px',
                    fontSize: Math.floor(this.size / 2.5) + 'px',
                }

                if (this.image_exists) {
                    Object.assign(default_styles, {
                        backgroundImage: `url(${this.loaded_src})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'top center',
                    })
                }

                return Object.assign(default_styles, this.customStyles)
            },
            background_color() {
                return this.colors[this.username.length % (this.colors.length)]
            },
        },
        methods: {
            /**
             * Attempt to load the image, if it succeed the letter avatar is replaced with the image
             */
            loadImage() {
                setTimeout(() => {
                    const img = new Image()
                    img.onload = () => {
                        this.loaded_src = this.src
                        this.image_exists = true
                    }
                    img.src = this.src
                }, this.delay)
            },
            format(parts) {
                if (parts.length <= 3) {
                    return parts
                }

                // We have more than 3 parts, let's keep only uppercased letters
                let initials = parts.filter(v => v === v.toUpperCase())

                // if we have more than one char we're good to go
                // if not we only keep the 2 first chars, and the last one
                return initials.length > 1
                    ? initials
                    : [...parts.splice(0, 2), parts[parts.length - 1]]
            },
        },
        /**
         * Each the component is mounted, it there is an src we attempt to load the image
         */
        mounted() {
            this.$nextTick(function () {
                if (this.src) this.loadImage()
            })
        },
        /**
         * The image does reload if the component stay in the same place when the data change
         * We must reload the image manually here
         */
        watch: {
            src(value) {
                this.image_exists = false
                this.$nextTick(function () {
                    if (value) this.loadImage()
                })
            },
        },
    }
</script>
