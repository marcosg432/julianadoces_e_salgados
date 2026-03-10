# Deploy na Hostinger - Juliana Doces e Salgados

## Importante: portas em uso

O projeto usa **somente a porta 3005**. As portas 22, 53, 80, 3000, 3001, 3002, 3003 e 3004 pertencem a outros projetos e **não devem ser alteradas**.

---

## Comandos para deploy (executar em ordem)

### 1. Conectar ao servidor
```bash
ssh root@193.160.119.67
```

### 2. Criar diretório do projeto
```bash
mkdir -p /var/www
cd /var/www
```

### 3. Clonar o repositório
```bash
git clone https://github.com/marcosg432/julianadoces_e_salgados.git
cd julianadoces_e_salgados
```

### 4. Instalar dependências
```bash
npm install --production
```

### 5. Iniciar o projeto com PM2 (apenas este projeto - não afeta os outros)
```bash
pm2 start ecosystem.config.js
```

### 6. Salvar a configuração do PM2 (para persistir após reinicialização do servidor)
```bash
pm2 save
pm2 startup
```
> Execute o comando que o `pm2 startup` exibir, caso ainda não esteja configurado.

### 7. Verificar se está rodando
```bash
pm2 list
pm2 logs juliana-doces-salgados
```

O site ficará disponível em: **http://193.160.119.67:3005**

---

## Comandos úteis (não afetam outros projetos)

| Comando | Descrição |
|---------|-----------|
| `pm2 list` | Lista todos os apps |
| `pm2 logs juliana-doces-salgados` | Ver logs em tempo real |
| `pm2 restart juliana-doces-salgados` | Reiniciar apenas este app |
| `pm2 stop juliana-doces-salgados` | Parar o app |
| `pm2 delete juliana-doces-salgados` | Remover o app do PM2 |

---

## Atualizar o site (após alterações no GitHub)

```bash
cd /var/www/julianadoces_e_salgados
git pull origin main
npm install --production
pm2 restart juliana-doces-salgados
```

---

## Configurar Nginx para domínio (opcional)

Se quiser acessar via domínio (ex: doceria.seudominio.com) na porta 80, adicione um novo server block no Nginx apontando para a porta 3005. **Não altere os server blocks existentes** dos outros projetos.
