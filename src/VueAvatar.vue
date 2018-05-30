<template>
    <div class="vue-avatar" :style="style">
        <span v-if="!image_exists">{{ initials }}</span>
    </div>
</template>

<script>
    /**
     * Inspired by https://github.com/ksz2k/letter_avatar
     *
     * @type {*[]}
     */
    const COLORS_HSL = [
        [6, 73, 60],
        [340, 100, 63],
        [291, 49, 60],
        [263, 50, 64],
        [232, 46, 64],
        [198, 94, 63],
        [187, 74, 58],
        [175, 44, 50],
        [152, 45, 53],
        [87, 54, 59],
        [66, 58, 59],
        [51, 85, 51],
        [16, 100, 69],
        [0, 0, 76],
        [201, 17, 63],
        [17, 16, 57],
        [0, 0, 64],
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
        },
        data() {
            return {
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

                const default_styles = {
                    display: 'inline-flex',
                    backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                    color: `hsl(${hue}, ${saturation}%, ${lightness + 30}%)`,
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
                        backgroundImage: `url(${this.src})`,
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
                const img = new Image()
                img.onload = () => this.image_exists = true
                img.src = this.src
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
