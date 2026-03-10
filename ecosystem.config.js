module.exports = {
  apps: [{
    name: 'juliana-doces-salgados',
    script: 'node_modules/serve/build/main.js',
    args: ['-p', '3005'],
    cwd: __dirname,
    env: {
      NODE_ENV: 'production'
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '200M'
  }]
};
