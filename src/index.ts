import {WebpackConfigWithMetadata, get} from '@easy-webpack/core'
import * as path from 'path'
import {TsConfigPathsPlugin} from 'awesome-typescript-loader'

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
        extensions: get(this, 'resolve.extensions', ['.js']).concat(['.ts'])
      },
      module: {
        rules: get(this, 'module.rules', []).concat([loader])
      },
      plugins: [
        new TsConfigPathsPlugin(options)
      ].concat(get(this, 'plugins', []))
    }
  }
}