# 🔥 Firebase Email/Password Auth - Quick Start Checklist

**Una guía rápida para implementar autenticación con Firebase en HTML/CSS/JS**

---

## ✅ **1. CONFIGURACIÓN INICIAL**

□ **Crear proyecto Firebase**
   - Ir a console.firebase.google.com
   - Hacer clic en "Add project"
   - Seguir los pasos de configuración

□ **Habilitar Email/Password**
   - Build → Authentication → Get started
   - Sign-in method → Email/Password → Enable

□ **Registrar Web App**
   - Project settings → General → Add app (</> icon)
   - Copiar la configuración Firebase

---

## 📁 **2. ESTRUCTURA DEL PROYECTO**

□ **Crear carpetas y archivos**
```
auth-tutorial/
├── index.html
├── login.html
├── register.html
├── welcome.html
├── assets/
│   └── styles.css
└── firebase/
    ├── config.js
    └── auth.js
```

---

## ⚙️ **3. CONFIGURACIÓN FIREBASE**

□ **Crear firebase/config.js** (archivo JS puro)
   - Importar Firebase SDK v10 desde CDN
   - Pegar tu configuración Firebase
   - Exportar { app, auth } con export

□ **Implementar firebase/auth.js**
   - Importar { auth } from './config.js'
   - registerWithEmailPassword()
   - loginWithEmailPassword()
   - logoutUser()
   - requireAuth() y redirectIfAuthenticated()
   - Exportar todas las funciones

---

## 🎨 **4. PÁGINAS HTML**

□ **Crear styles.css**
   - Layout responsive con cards
   - Tema oscuro moderno
   - Estilos para formularios y botones

□ **Implementar páginas:**
   - □ index.html (Home con enlaces)
   - □ login.html (Formulario de login)
   - □ register.html (Formulario de registro)
   - □ welcome.html (Página protegida)

---

## 🧪 **5. PRUEBAS LOCALES**

□ **Usar Live Server (Recomendado)**
   - Instalar extensión "Live Server" en VS Code/Cursor
   - Clic derecho en index.html → "Open with Live Server"
   - Se abre automáticamente en localhost:5500
   
□ **Alternativas:** Python o Node.js con servidor local

□ **Probar funcionalidades**
   - □ Registro de nuevos usuarios
   - □ Login con credenciales
   - □ Redirecciones automáticas
   - □ Logout y protección de páginas

---

## 🚀 **6. DESPLIEGUE**

□ **Firebase Hosting**
   - `npm install -g firebase-tools`
   - `firebase login`
   - `firebase init hosting`
   - `firebase deploy`

---

## ⚠️ **ERRORES COMUNES**

**❌ "Firebase is not defined"**
→ Verificar orden de carga de scripts

**❌ "Module not found"**
→ Usar Live Server o servidor local, no abrir archivos directamente

**❌ "Firebase config is invalid"**
→ Revisar configuración copiada desde Firebase Console

**❌ Redirecciones no funcionan**
→ onAuthStateChanged puede tardar, implementar loading

---

## 🛡️ **SEGURIDAD**

□ Configurar dominios autorizados en Firebase
□ Habilitar solo métodos de auth necesarios
□ Para producción: usar variables de entorno
□ Implementar reglas de seguridad si usas Firestore

---

## 📚 **RECURSOS ADICIONALES**

**Documentación completa:** [Enlace a tu página web]
**Firebase Docs:** firebase.google.com/docs/auth
**Código completo:** Contactar al instructor

---

**🎯 ¡Listo! Con estos pasos tendrás un sistema de autenticación funcional.**

*Escanea el QR para acceder a la guía completa online* 📱

---

*Creado para estudiantes - Firebase Auth Tutorial*
