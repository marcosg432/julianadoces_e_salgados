module.exports = {
  apps: [{
    name: 'juliana-doces-salgados',
    script: 'node_modules/serve/bin/serve.js',
    args: '-p 3005 -s',
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
