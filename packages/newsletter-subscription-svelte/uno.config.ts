// uno.config.ts
import { defineConfig, presetIcons, presetUno, transformerVariantGroup } from 'unocss'
import type { Theme } from '@unocss/preset-mini'

export default defineConfig<Theme>({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      collections: {
        test: () => ({ prefix: '', icons: { foo: { body: '', height: 24, width: 24 } } }),
        nortic: {
          logo: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.07 5.59"><g fill="currentColor"><path d="M8.89 2.18c-.21-.16-.45-.3-.74-.4-.3-.1-.6-.13-.95-.13-.4 0-.77.05-1.06.16-.32.1-.56.24-.77.42a1.83 1.83 0 0 0-.63 1.43c0 .32.05.58.18.82a1.88 1.88 0 0 0 1.27.98 3.4 3.4 0 0 0 1.85 0c.3-.08.56-.21.77-.4a1.74 1.74 0 0 0 .71-1.48 1.8 1.8 0 0 0-.63-1.4zM7.62 4.27c-.1.16-.3.24-.48.24-.23 0-.4-.08-.5-.27-.1-.18-.16-.4-.16-.63 0-.1 0-.24.03-.35.03-.1.05-.2.1-.29a.8.8 0 0 1 .22-.2.56.56 0 0 1 .31-.09c.22 0 .37.08.48.27.1.18.16.4.16.63 0 .32-.05.53-.16.69zM22.07 5.3l-.19-1a.06.06 0 0 0-.05-.06h-.08l-.32.08c-.1.03-.24.03-.37.03s-.24-.03-.34-.05a.98.98 0 0 1-.3-.14.62.62 0 0 1-.2-.23.73.73 0 0 1-.09-.35c0-.24.08-.4.24-.55a.97.97 0 0 1 .64-.21c.16 0 .29 0 .4.02l.26.08c.05.03.1 0 .13-.08l.24-.98c0-.05-.03-.08-.08-.08-.18-.05-.37-.1-.56-.1-.18-.03-.34-.03-.5-.03-.45 0-.82.05-1.14.16-.31.1-.58.26-.79.45a1.78 1.78 0 0 0-.6 1.35c0 .29.04.55.15.8.1.23.27.44.48.6.2.16.45.3.74.4.29.08.63.13.98.13.23 0 .47-.03.71-.05.21-.03.4-.08.56-.13.08.02.08-.03.08-.06zM16.64 1.28c.19.08.37.08.58.05.22-.05.4-.13.56-.26.13-.16.21-.32.19-.53V.51c.05-.08.02-.16-.06-.18h-.02a.64.64 0 0 0-.37-.27 1.04 1.04 0 0 0-.64-.02.88.88 0 0 0-.5.29c-.13.13-.21.29-.19.47v.03c-.05.08-.02.16.06.19 0 0 .02 0 .02.02.1.1.24.19.37.24zM17.91 1.62h-1.5c-.09 0-.14.06-.14.11v3.76c0 .05.05.1.13.1h1.51c.06 0 .13-.05.13-.1V1.73c0-.05-.05-.1-.13-.1ZM15.21 4.3a.2.2 0 0 1-.2-.21V2.87h.79c.02 0 .05-.03.05-.05V1.7a.06.06 0 0 0-.05-.05H15V.83a.06.06 0 0 0-.05-.05l-1.56.55a.06.06 0 0 0-.06.06v.26h-.44a.06.06 0 0 0-.06.05V2.8c0 .03.03.05.06.05h.44v1.13c0 .56.14.96.4 1.2.1.1.27.21.48.3.18.07.42.1.66.1.21 0 .4 0 .56-.03l.4-.08c.04-.03.07-.05.07-.08V4.32h-.03zM2.75 1.62c-.16 0-.32.03-.45.06-.1.02-.24.08-.32.1-.1.06-.18.08-.23.14V1.8c0-.05-.06-.1-.14-.1H.13c-.08 0-.13.05-.13.1v.9c.1 0 .21.1.21.21v1.35a.2.2 0 0 1-.21.21V5.46c0 .05.05.1.13.1h1.51c.08 0 .13-.05.13-.1V3.2c0-.24.21-.43.48-.43.24 0 .45.19.45.4v2.3c0 .05.05.1.13.1h1.48c.08 0 .13-.05.13-.1v-2.2C4.44 2.71 4.3 2.3 4 2a2.17 2.17 0 0 0-1.25-.37ZM12.49 1.73c-.03-.05-.08-.08-.16-.08-.3 0-.53.13-.53.13-.1.06-.21.1-.3.19v-.24c0-.05-.04-.1-.12-.1H9.87c-.08 0-.13.05-.13.1V5.46c0 .05.05.1.13.1h1.51c.02 0 .05 0 .08-.02.02 0 .05-.03.05-.08V3.08c0-.13.1-.21.21-.21h.72c.02 0 .05-.03.05-.05V1.76z" class="st0"/></g></svg>',
        },
      },
      customizations: {
        iconCustomizer(collection, icon, props) {
          if (collection === 'nortic') {
            if (icon === 'logo') {
              props.width = '4em'
              props.height = '1em'
            }
          }
        },
      },
    }),
  ],
  transformers: [
    transformerVariantGroup(),
  ],

  cli: {
    entry: {
      patterns: ['src/**/*.svelte'],
      outFile: 'src/assets/style.css',
    },
  },

  shortcuts: [
    ['nortic--wrapper', 'p-4 bg-variable-background rounded-lg border border-solid border-variable-border text-variable-text inline-block'],
    ['nortic--title', 'text-2xl font-semibold my-0'],
    ['nortic--subtitle', 'text-sm text-variable-sub mt-0 mb-4 max-w-md'],
    ['nortic--input-wrapper', 'block w-full mb-1'],
    ['nortic--input-label', 'block text-base font-normal'],
    ['nortic--input', 'block w-full pl-2 py-2 rounded-lg border border-solid border-variable-border box-border'],
    ['nortic--input-hint', 'block text-xs text-variable-sub mt-0.5 pl-2'],
    ['nortic--input-error', 'text-variable-error'],
    ['nortic--tag-wrapper', 'mb-8'],
    ['nortic--tag-title', 'text-lg font-semibold text-variable-sub mt-2 mb-1  '],
    ['nortic--subscribe-btn', 'flex items-center justify-center cursor-pointer gap-2 w-full p-2 mt-4 text-lg rounded-lg transition-colors duration-300 bg-black hover:bg-black/80 text-white text-center shadow-none border-none disabled:opacity-50 [&>span]:inline-block'],
    ['nortic--loading-spinner', 'i-eos-icons-loading'],
    ['nortic--form-error-wrapper', 'text-variable-error px-4 bg-variable-error/20 py-2 rounded-lg mt-4 [&>p]:my-0'],
    ['nortic--affiliation', 'mt-4 mb-0 inline! opacity-100! float-right text-xs text-gray-800 px-2 py-1 bg-white border border-variable-border border-solid rounded-md text-right [&>a]:(text-nortic font-semibold decoration-none)'],
    ['nortic--affiliation-logo', 'i-nortic-logo inline-block ml-1 text-base'],
    ['nortic--success-wrapper', 'flex items-center justify-center text-center'],
    ['nortic-success-container', 'text-center [&>h2]:(text-2xl text-center font-semibold mt-0 mb-1) [&>p]:(text-sm text-variable-sub mt-0 mb-4)'],
  ],

  theme: {
    colors: {
      nortic: {
        DEFAULT: '#3746A4',
      },
      variable: {
        error: 'rgba(var(--nortic-form-error, 239, 68, 68))',
        background: 'rgba(var(--nortic-background, 243, 244, 246))',
        border: 'rgba(var(--nortic-border, 213, 215, 219))',
        text: 'rgba(var(--nortic-text, 0, 0, 0))',
        sub: 'rgba(var(--nortic-sub, 55, 65, 81))',
      },
    },
  },
})
