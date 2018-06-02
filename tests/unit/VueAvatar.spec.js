import { shallowMount } from '@vue/test-utils'
import './utils/console/'
import VueAvatar from '@/VueAvatar.vue'

describe('VueAvatar.vue', () => {
    describe('computed initials', () => {
        it('should divide name in parts on both space and hyphen', () => {
            const wrapper = shallowMount(VueAvatar, {
                propsData: { username: 'Hubert Felix' },
            })
            expect(wrapper.vm.initials).toEqual('HF')

            wrapper.vm.username = 'Hubert-Felix Thiefaine'
            expect(wrapper.vm.initials).toEqual('HFT')

            wrapper.vm.username = 'Hubert-Felix'
            expect(wrapper.vm.initials).toEqual('HF')
        })

        it('should use only the first letter of each name parts (up to three)', function () {
            const wrapper = shallowMount(VueAvatar, {
                propsData: { username: 'Hubert Felix De La Rochefoucault' },
            })
            expect(wrapper.vm.initials).toEqual('HFD')
        })

        it('should use only the uppercase letter (up to three) if the name has more than three parts', function () {
            const wrapper = shallowMount(VueAvatar, {
                propsData: { username: 'Hubert de la Rochefoucault' },
            })
            expect(wrapper.vm.initials).toEqual('HR')

            wrapper.vm.username = 'Hubert-Felix de la Rochefoucault'
            expect(wrapper.vm.initials).toEqual('HFR')
        })

        it('should use lowercase letter (up to three) if the name has no uppercase', function () {
            const wrapper = shallowMount(VueAvatar, {
                propsData: { username: 'hubert de rochefoucault' },
            })
            expect(wrapper.vm.initials).toEqual('HDR')

            wrapper.vm.username = 'hubert-felix de la rochefoucault'
            expect(wrapper.vm.initials).toEqual('HFR')
        })

        it('should use both uppercase and lowercase letter if name has three parts or less', function () {
            const wrapper = shallowMount(VueAvatar, {
                propsData: { username: 'Hubert de Rochefoucault' },
            })
            expect(wrapper.vm.initials).toEqual('HDR')
        })
    })
    describe('computed style', () => {
        it('should return default styles for letter avatar and no image specific styles', () => {
            const wrapper = shallowMount(VueAvatar, {
                propsData: { username: 'Hubert Felix' },
            })

            const style = wrapper.vm.style
            expect(style.backgroundColor).toEqual('hsl(51, 95%, 53%)')
            expect(style.color).toEqual('hsl(51, 95%, 33%)')
            expect(style.borderRadius).toEqual('50%')
            expect(style.width).toEqual('50px')
            expect(style.fontSize).toEqual(Math.floor(50 / 2.5) + 'px')
            expect(style.backgroundImage).toBeUndefined()
            expect(style.backgroundSize).toBeUndefined()
            expect(style.backgroundPosition).toBeUndefined()
        })

        it('should return no image specific styles if the image is not lazy loaded successfully', () => {
            const wrapper = shallowMount(VueAvatar, {
                propsData: {
                    username: 'Hubert Felix',
                    src: '/my-image.jpg',
                },
            })

            const style = wrapper.vm.style
            expect(style.backgroundImage).toBeUndefined()
            expect(style.backgroundSize).toBeUndefined()
            expect(style.backgroundPosition).toBeUndefined()
        })

        it('should return with image specific styles if the image is lazy loaded successfully', () => {
            const wrapper = shallowMount(VueAvatar, {
                propsData: {
                    username: 'Hubert Felix',
                    src: '/my-image.jpg',
                },
            })

            wrapper.vm.loaded_src = '/my-image.jpg'
            wrapper.vm.image_exists = true

            const style = wrapper.vm.style
            expect(style.backgroundImage).toEqual('url(/my-image.jpg)')
            expect(style.backgroundSize).toBeDefined()
            expect(style.backgroundPosition).toBeDefined()
        })

        it('should return style overrides when given via props', () => {
            const wrapper = shallowMount(VueAvatar, {
                propsData: {
                    username: 'Hubert Felix',
                    customStyles: {
                        fontSize: '100px',
                        minHeight: '500vh',
                    },
                },
            })

            const style = wrapper.vm.style
            expect(style.fontSize).toEqual('100px')
            expect(style.minHeight).toEqual('500vh')
        })

        it('should return style with specified options', () => {
            const wrapper = shallowMount(VueAvatar, {
                propsData: {
                    username: 'Hubert Felix',
                    size: 25,
                    borderRadius: 20,
                    colors: [[20, 30, 50]],
                },
            })

            const style = wrapper.vm.style
            expect(style.backgroundColor).toEqual('hsl(20, 30%, 50%)')
            expect(style.color).toEqual('hsl(20, 30%, 30%)')
            expect(style.borderRadius).toEqual('20%')
            expect(style.width).toEqual('25px')
            expect(style.fontSize).toEqual(Math.floor(25 / 2.5) + 'px')
        })
    })
})
