import path from 'path'

const config = {
	kit: {	
		vite: {
			resolve: {
				alias: {
					'@lib': path.resolve('./src/lib'),
				}
			}
		}
	},
}

export default config
