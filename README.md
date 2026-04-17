# PortoFlow Frontend (React + Tailwind)

Frontend corporativo para operação de mobilidade logística com experiências para Solicitante, Motorista e Central de Controle.

## Rodar localmente

```bash
cd frontend
npm install
npm run dev
```

## Rotas

- `/login`
- `/solicitante`
- `/motorista`
- `/central`

## Login demo

- `req001` → Solicitante
- `drv001` → Motorista
- `ctr001` → Central

Qualquer senha no modo mock.

## Integração API

- Defina `VITE_API_URL=http://localhost:8080/api` em `.env`.
- O token JWT é salvo no `localStorage`.
- Interceptor adiciona `Authorization: Bearer <token>`.
- Resposta `401` limpa sessão e retorna ao login.
