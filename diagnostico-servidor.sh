#!/bin/bash
# Execute no servidor: bash diagnostico-servidor.sh
# ou: chmod +x diagnostico-servidor.sh && ./diagnostico-servidor.sh

echo "=== 1. Diretório atual e arquivos HTML ==="
pwd
ls -la *.html 2>/dev/null || echo "Nenhum HTML na raiz"

echo ""
echo "=== 2. PM2 - processo rodando ==="
pm2 list 2>/dev/null || echo "PM2 não encontrado"

echo ""
echo "=== 3. PM2 - detalhes do app juliana-doces-salgados ==="
pm2 show juliana-doces-salgados 2>/dev/null | head -40 || echo "App não encontrado"

echo ""
echo "=== 4. Script que o PM2 está executando ==="
pm2 describe juliana-doces-salgados 2>/dev/null | grep -E "script|interpreter" || true

echo ""
echo "=== 5. Teste local no servidor (porta 3005) ==="
curl -s -o /dev/null -w "HTTP / : %{http_code}\n" http://127.0.0.1:3005/ 2>/dev/null || echo "Não conseguiu conectar em 127.0.0.1:3005"
curl -s -o /dev/null -w "HTTP /doces : %{http_code}\n" http://127.0.0.1:3005/doces 2>/dev/null || echo "Não conseguiu conectar"
curl -s -o /dev/null -w "HTTP /salgados : %{http_code}\n" http://127.0.0.1:3005/salgados 2>/dev/null || echo "Não conseguiu conectar"

echo ""
echo "=== 6. Node e Express instalados? ==="
which node
node -v
ls node_modules/express 2>/dev/null && echo "Express: OK" || echo "Express: NÃO ENCONTRADO"
ls node_modules/serve 2>/dev/null && echo "Serve: instalado (remover se usar Express)" || echo "Serve: não instalado"

echo ""
echo "=== 7. Conteúdo das primeiras linhas de /doces (se 200) ==="
curl -s http://127.0.0.1:3005/doces 2>/dev/null | head -3 || echo "Não disponível"
