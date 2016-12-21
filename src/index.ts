import {WebpackConfigWithMetadata, get} from '@easy-webpack/core'
import * as path from 'path'
const { TsConfigPathsPlugin, CheckerPlugin } = require('awesome-typescript-loader') // does not complain about typings

/**
 * Typescript loader support for .ts
 * See: https://github.com/s-panferov/awesome-typescript-loader
 */
export = function typescript({options = undefined, exclude = null} = {}) {
  return function typescript(this: WebpackConfigWithMetadata): WebpackConfigWithMetadata {
    const loader = {
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader',
      exclude: exclude || (this.metadata.root ? [path.join(this.metadata.root, 'node_modules')] : []),
      options
    } as any

    return {
      resolve: {
        extensions: get(this, 'resolve.extensions', ['.js']).concat(['.tsx', '.ts'])
      },
      module: {
        rules: get(this, 'module.rules', []).concat([loader])
      },
      plugins: [
        new TsConfigPathsPlugin(options),
        new CheckerPlugin()
      ].concat(get(this, 'plugins', []))
    }
  }
}
