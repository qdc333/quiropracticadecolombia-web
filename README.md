# Quiropráctica de Colombia — Sitio web

Landing page estática en Next.js para la clínica quiropráctica en Barranquilla.

## Desarrollo local

```powershell
cd C:\Users\Link\Projects\quiropractica-colombia
npm install
npm run dev
```

Abre http://localhost:3000

## Despliegue

Sube este repositorio a **Vercel**. Solo necesitas la variable opcional:

```env
NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
```

## Formulario de contacto

El formulario envía los datos a Gmail mediante [FormSubmit.co](https://formsubmit.co), configurado en `components/ConsultaForm.tsx` con el correo de `lib/site.ts`.

## Estructura

- `app/(site)/` — página principal y página de gracias
- `components/` — landing, header, footer, formulario
- `lib/site.ts` — WhatsApp, correos, Instagram
- `public/images/` — imágenes del sitio
