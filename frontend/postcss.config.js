<<<<<<< HEAD
module.exports = {
  // Add you postcss configuration here
  // Learn more about it at https://github.com/webpack-contrib/postcss-loader#config-files
  plugins: [
    ["autoprefixer"],
    ["postcss-nested"],
  ],
};
=======

/** 
 * @see https://nextjs.org/docs/pages/building-your-application/configuring/post-css#customizing-plugins 
 */

module.exports = {
  plugins:
    [
      'postcss-flexbugs-fixes',
      [
        'postcss-preset-env',
        {
          autoprefixer: {
            flexbox: 'no-2009',
          },
          stage: 3,
          features: {
            'custom-properties': false,
          },
        },
      ],
      "postcss-nested",
    ]
}
>>>>>>> develop/v0.1
