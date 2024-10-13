import process from 'node:process'
import madge from 'madge'
import { glob } from 'zx'

const files = await glob(['app/**/*.ts', 'app/**/*.tsx'])
console.log(files)
const res = await madge(files, {
  detectiveOptions: {
    ts: {
      skipTypeImports: true,
    },
  },
})

const circular = res.circular()
if (circular.length) {
  console.error('Circular dependencies found')
  console.error(circular)
  process.exit(1)
}
