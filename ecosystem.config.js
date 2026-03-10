module.exports = {
  apps: [{
    name: 'juliana-doces-salgados',
    script: 'server.js',
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
