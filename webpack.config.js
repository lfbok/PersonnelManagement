var path = require("path");

module.exports = {
    entry : "./www/app/main.js" ,
    output : {
        path : path.resolve(__dirname , "./www/dist") ,
        filename : "bundle.js"
    },
    module : {
        rules : [
            {
                test : /\.js$/ ,
                include : [
                    path.resolve(__dirname , "./www/app")
                ],
                exclude : [
                    path.resolve(__dirname , "node_modules")
                ],
                loader : "babel-loader" ,
                options : {
                    presets: ["es2015" , "react" , "stage-3"],
                    plugins : [
                        "syntax-object-rest-spread",
                        "transform-object-rest-spread",
                        [
                            "transform-runtime", {
                              "helpers": false, // defaults to true
                              "polyfill": false, // defaults to true
                              "regenerator": true, // defaults to true
                              "moduleName": "babel-runtime" // defaults to "babel-runtime"
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "less-loader" // compiles Less to CSS
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    }
                ]
            }
        ]
    },
    watch : true
}