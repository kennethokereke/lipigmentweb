const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        app: ['./src/index.tsx'],
        vendor: ['react', 'react-dom'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'

    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js', '.tsx', 'jsx', '.scss', '.json'],
        alias: {
            styles: path.resolve(__dirname, 'src', 'styles'),
        }
        
    },
    devServer: {
        contentBase: './dist',
        port: 8000,
    },
    
    module: {
        rules: [
            {test: /\.(ts|js)$/,
             exclude: '/node_modules/',
             loader: 'babel-loader',
            
            },
            {test:  /\.tsx?$/,
                exclude: '/node_modules/',
                loader: 'awesome-typescript-loader',
               
               },

            { test: /\.scss$/, use: [ 
                { loader: "style-loader" },  // to inject the result into the DOM as a style block
                { loader: "css-modules-typescript-loader"},  // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
                { loader: "css-loader", options: { modules: true } },  // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
                { loader: "sass-loader" },  // to convert SASS to CSS
                // NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
            ] }, 
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            template : './src/index.html',
        })
    ]
}