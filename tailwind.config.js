module.exports = {
	content: [
		'./src/**/*.vue',
		'./src/**/*.js',
		'./src/**/*.jsx',
		'./src/**/*.html',
		'./src/**/*.md',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				// Brand new palette — editorial dark
				ink:       '#0A0A0A',
				'ink-2':   '#111111',
				'ink-3':   '#1A1A1A',
				'ink-4':   '#242424',
				'ink-5':   '#2E2E2E',
				wire:      '#333333',
				'wire-2':  '#444444',
				mist:      '#888888',
				'mist-2':  '#AAAAAA',
				chalk:     '#E8E8E8',
				snow:      '#F5F5F5',
				lime:      '#E8FF47',   // primary accent
				'lime-dim':'#C8DF30',
				ember:     '#FF5C35',   // secondary accent
				sky:       '#4DFFDB',   // tertiary accent

				// Legacy compat
				'primary-light':   '#F7F8FC',
				'secondary-light': '#FFFFFF',
				'ternary-light':   '#f6f7f8',
				'primary-dark':    '#0D2438',
				'secondary-dark':  '#102D44',
				'ternary-dark':    '#1E3851',
			},
			fontFamily: {
				sans: ['GeneralSans-Regular', 'Helvetica Neue', 'Arial', 'sans-serif'],
			},
			fontSize: {
				'10xl': ['10rem',  { lineHeight: '0.9' }],
				'11xl': ['12rem',  { lineHeight: '0.85' }],
				'12xl': ['14rem',  { lineHeight: '0.82' }],
			},
			animation: {
				'marquee':      'marquee 25s linear infinite',
				'marquee2':     'marquee2 25s linear infinite',
				'spin-slow':    'spin 12s linear infinite',
				'float':        'float 6s ease-in-out infinite',
				'blink':        'blink 1.2s step-end infinite',
			},
			keyframes: {
				marquee:  { '0%': { transform: 'translateX(0%)' },   '100%': { transform: 'translateX(-100%)' } },
				marquee2: { '0%': { transform: 'translateX(100%)' },  '100%': { transform: 'translateX(0%)' } },
				float:    { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
				blink:    { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
			},
			container: {
				center: true,
				padding: { DEFAULT: '1.5rem', sm: '2rem', lg: '4rem', xl: '5rem' },
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
