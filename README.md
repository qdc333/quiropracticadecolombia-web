# Quiropráctica de Colombia

Proyecto dividido en **dos repos** para GitHub:

| Carpeta | Qué es | Dónde desplegar |
|---------|--------|-----------------|
| **`frontend/`** | Sitio Next.js (público + panel admin UI) | **Vercel** |
| **`backend/`** | API Express + MongoDB + pagos Wompi | **Railway** |

## Probar ahora (sin MongoDB)

**Solo ver el diseño del sitio:**
```powershell
cd frontend
npm install
npm run dev
```
→ http://localhost:3000 (`NEXT_PUBLIC_USE_MOCK=true`)

**Probar sitio + admin + misiones (sin MongoDB):**
```powershell
# Terminal 1
cd backend
npm install
npm run dev

# Terminal 2 — en frontend/.env.local pon NEXT_PUBLIC_USE_MOCK=false
cd frontend
npm run dev
```

- Sitio: http://localhost:3000
- Admin: http://localhost:3000/admin/login
- API: http://localhost:4000

Credenciales admin (modo mock): las de `ADMIN_EMAIL` / `ADMIN_PASSWORD` en `backend/.env`

## Cuando MongoDB funcione

En `backend/.env`:
```env
USE_MOCK_DATA=false
DATABASE_URL="mongodb://127.0.0.1:27017/quiropractica-colombia"
```

```powershell
cd backend
npx prisma db push
npm run db:seed
```

## Subir a GitHub

Crea **dos repositorios** y sube cada carpeta por separado:

```powershell
cd frontend
git init
git add .
git commit -m "Frontend Quiropráctica de Colombia"
# git remote add origin ...
# git push

cd ..\backend
git init
git add .
git commit -m "Backend API Quiropráctica de Colombia"
# git push
```

La carpeta raíz antigua (`app/`, `components/` en la raíz) es la versión monolito anterior — usa **`frontend/`** y **`backend/`**.
