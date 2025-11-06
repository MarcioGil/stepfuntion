# Deploy do Frontend no GitHub Pages

## Passos rápidos

1. Instale o pacote gh-pages:
   ```powershell
   npm install --save gh-pages
   ```

2. No `package.json`, adicione:
   - O campo `homepage`: "https://marciogil.github.io/stepfuntion/frontend"
   - Os scripts:
     ```json
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
     ```

3. Faça o deploy:
   ```powershell
   npm run deploy
   ```

Pronto! O site estará disponível em:
https://marciogil.github.io/stepfuntion/frontend

Se precisar de ajuda para editar o `package.json`, avise!