#!/bin/bash


if [[ $# == 1 ]]; then
    mkdir $1
    cd $1
else
    if [[ $2 != "." ]] || [[ $2 != ".." ]]; then
        mkdir $2
        cd $2
fi

if [[ -z $3 ]]; then
    pipenv --python $3
else
    pipenv --python 3.7

pipenv install django django-webpack-loader django-heroku gunicorn jinja2 \
    python-dotenv

npm init -y

npm i -D @babel/core @babel/plugin-proposal-class-properties @babel/preset-env \
    @babel/preset-react @babel/register @svgr/webpack autoprefixer \
    babel-eslint babel-loader clean-webpack-plugin compression-webpack-plugin \
    css-loader eslint eslint-config-react-app eslint-plugin-flowtype \
    eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react \
    eslint-plugin-react-hooks file-loader html-webpack-plugin \
    mini-css-extract-plugin node-sass postcss-loader sass sass-loader \
    style-loader ttf-loader uglifyjs-webpack-plugin \
    url-loader webpack webpack-bundle-analyzer webpack-bundle-tracker \
    webpack-cli webpack-dev-server webpack-merge zlib

npm i @fortawesome/fontawesome-free bootstrap-css-only cloudinary-react \
    dateformat mdbreact react react-dom react-fontawesome react-helmet

node > package.json  <<EOF

var data = require("./package.json");
data.name = $1
data.scripts = {
  ...data.scripts,
  "dev": "webpack --config webpack.dev.js",
  "build": "webpack --config webpack.prod.js",
  "watch": "webpack --config webpack.dev.js --watch"
}
data.engines = {
    "node": "12.16.1",
    "npm": "6.14.5"
}

console.log(JSON.stringify(data))

EOF
