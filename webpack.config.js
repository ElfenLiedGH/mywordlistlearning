const path = require("path");
const webpack = require("webpack");
const LessPluginAutoPrefix = require("less-plugin-autoprefix");
const CompressionPlugin = require('compression-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || "development";
const isProduction = () => NODE_ENV === "production";
console.log("isProduction=", isProduction());

const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    inject: false,
    title: "Wordlist",
    filename: "index.html",
    template: "html/index.ejs",
    appMountId: "app-root"
});
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const favicon = new FaviconsWebpackPlugin({
    logo: path.resolve(__dirname, 'src/img/words.png'),
    // prefix: '/icons-[hash]/',
    inject: true,
    icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        coast: true,
        favicons: true,
        firefox: true,
        opengraph: true,
        twitter: true,
        yandex: true,
        windows: true
    }
});
const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();

const definePlugin = new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
    "__DEVELOPMENT__": !isProduction()
});

const loaderOptionsPlugin = new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
});

// CSS modules
const lessLoader = [
    {
        loader: "css-loader",
        options: {
            module: true,
            localIdentName: "[name]__[local]--[hash:base64:5]"
        }
    }, {
        loader: "less-loader",
        options: {
            plugins: [
                new LessPluginAutoPrefix({
                    browsers: [
                        "last 2 versions",
                        "iOS >= 8",
                        "Safari >= 8"]
                })
            ]
        }
    }
];

const PORT = "8099";

let config = {
    entry: [
        // 'whatwg-fetch',
        // "./src/packages/themes/dist/semantic.css",
        // "babel-polyfill",
        "./src/index.jsx"
    ],
    context: path.resolve(__dirname),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: isProduction() ? "./" : "/"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader"
            },
            {
                test: /\.(ico|eot|otf|webp|ttf|woff|woff2)$/i,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "assets/fonts/[name].[hash].[ext]",
                        publicPath: isProduction() && process.env.ROOT_ROUTE ? `/${process.env.ROOT_ROUTE}/` : undefined
                    }
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "assets/img/[name].[hash].[ext]",
                            publicPath: isProduction() && process.env.ROOT_ROUTE ? `/${process.env.ROOT_ROUTE}/` : undefined
                        }
                    }
                ]
            }, {
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                    // options: {publicPath: null}
                }, {
                    loader: "css-loader",
                    options: {minimize: true}
                }]
            },
            {
                test: /\.less$/,
                use: [
                    {loader: "style-loader"},
                    ...lessLoader
                ]
            }
        ]
    },
    plugins: [htmlWebpackPlugin, definePlugin, favicon],
    // performance: {
    //     hints: false
    // },
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 1000,
        poll: 1000
    },
    devtool: "eval",
    resolve: {
        extensions: [".js", ".jsx", ".js", ".json", ".css", ".less"],
        alias: {}
    },
    devServer: {
        hot: true,
        // overlay: false,
        // compress: false,
        port: PORT,
        // inline: true,
        clientLogLevel: "error",
        contentBase: [
            path.join(__dirname, "src"),
        ],
        historyApiFallback: true
    }
};

if (isProduction()) {
    config.devServer.hot = false;
    config.devtool = false;
    config.plugins.push(loaderOptionsPlugin);
    config.plugins.push(new CompressionPlugin());
} else {
    config.plugins.push(hotModuleReplacementPlugin);
    // config.entry = ["react-hot-loader/patch"].concat(config.entry);
}

module.exports = config;
