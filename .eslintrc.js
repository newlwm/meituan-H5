module.exports = {
    root: true,
    env: {
      node: true
    },
    'extends': [
      'plugin:vue/essential',
      'eslint:recommended'
    ],
    parserOptions: {
      parser: '@babel/eslint-parser'
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/multi-word-component-names':"off",  //解决eslint命名规则报错
      "no-unused-vars": 0  // 定义的变量未使用报错的配置
    },
    overrides: [
          //这里是添加的代码
          { 
            files: ['src/View/index.vue','src/View/**/index.vue'],   // 匹配views和二级目录中的index.vue
            rules: {} //给上面匹配的文件指定规则
          },
      {
        files: [
          '**/__tests__/*.{j,t}s?(x)',
          '**/tests/unit/**/*.spec.{j,t}s?(x)'
        ],
        env: {
          jest: true
        }
      }
    ]
  }