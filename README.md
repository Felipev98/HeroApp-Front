# Hero App - Frontend

Aplicación frontend para la gestión de héroes con autenticación mediante AWS Cognito, construida con Next.js.

## 🚀 Características

- ✅ Interfaz moderna y responsive
- ✅ Autenticación con AWS Cognito
- ✅ CRUD completo de héroes
- ✅ Búsqueda y filtrado de héroes
- ✅ Marcar héroes como completados
- ✅ Tests E2E con Cypress
- ✅ TypeScript para type safety
- ✅ Arquitectura modular con hooks, helpers y componentes reutilizables

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn
- Backend API ejecutándose (ver documentación del backend)

## 

El frontend estará disponible en `http://localhost:3000`

## 🏃 Ejecución

```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start

# Tests E2E
npm run cypress:open
npm run cypress:run
```

## 📦 Estructura del Proyecto

Se dividieron todos los componentes a su forma más granular y toda la parte lógica se maneja desde servicios, helpers y hooks.
```
hero-app/
├── src/
│   ├── app/                    # Páginas y rutas de Next.js
│   │   ├── page.tsx           # Página de inicio
│   │   ├── login/             # Página de login/registro
│   │   └── heroes/            # Página de gestión de héroes
│   ├── components/            # Componentes React reutilizables
│   │   ├── AuthForm/         # Formulario de autenticación
│   │   ├── HeroCard/         # Tarjeta de héroe
│   │   ├── HeroModal/        # Modal para crear/editar héroe
│   │   ├── Navbar/           # Barra de navegación
│   │   └── GeneralComponents/ # Componentes generales
│   ├── contexts/             # Contextos de React
│   │   └── AuthContext.tsx   # Contexto de autenticación
│   ├── hooks/                # Custom hooks
│   │   ├── useHeroes.ts      # Hook para operaciones CRUD de héroes
│   │   └── useAuth.ts        # Hook para autenticación
│   ├── helpers/              # Funciones helper
│   │   ├── heroHelpers.ts    # Helpers relacionados con héroes
│   │   └── toast.ts          # Helpers para toasts (SweetAlert2)
│   ├── lib/                  # Utilidades y configuraciones
│   │   └── api.ts            # Cliente API y funciones de peticiones HTTP
│   ├── types/                # Tipos TypeScript
│   │   ├── hero.types.ts     # Tipos relacionados con Héroes
│   │   ├── auth.types.ts     # Tipos relacionados con Autenticación
│   │   ├── api.types.ts      # Tipos genéricos para respuestas de API
│   │   └── component.types.ts # Tipos para componentes
│   └── app/
│       └── layout.tsx        # Layout principal
├── cypress/                  # Tests E2E con Cypress
│   ├── e2e/                 # Tests end-to-end
│   └── support/             # Configuración y comandos personalizados
├── public/                  # Archivos estáticos
└── package.json
```

## 🧪 Testing

### Frontend (Cypress)

```bash
# Abrir Cypress en modo interactivo
npm run cypress:open

# Ejecutar tests en modo headless
npm run cypress:run
```

Los tests están ubicados en `cypress/e2e/` y cubren:
- Funcionalidad de login y registro
- Validaciones de formularios
- Navegación entre páginas

## 📚 Documentación de Componentes

### Custom Hooks

#### `useHeroes`

Hook para manejar todas las operaciones CRUD de héroes.

**Estado:**
- `heroes: Hero[]` - Lista de héroes
- `loading: boolean` - Estado de carga
- `error: string | null` - Mensaje de error

**Métodos:**
- `getAllHeroes()` - Obtener todos los héroes
- `getHeroById(id: string)` - Obtener un héroe por ID
- `createHero(data: CreateHeroData)` - Crear un nuevo héroe
- `updateHero(id: string, data: UpdateHeroData)` - Actualizar un héroe
- `deleteHero(id: string)` - Eliminar un héroe
- `markHeroAsDone(id: string)` - Marcar un héroe como completado
- `clearError()` - Limpiar el error
- `setHeroes(heroes: Hero[])` - Establecer héroes manualmente

**Ejemplo de uso:**
```typescript
import { useHeroes } from '@/hooks';

function HeroesPage() {
  const { heroes, loading, error, getAllHeroes, createHero, deleteHero } = useHeroes();

  useEffect(() => {
    getAllHeroes();
  }, [getAllHeroes]);

  const handleCreate = async (data: CreateHeroData) => {
    await createHero(data);
  };

  return (
    <div>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      {heroes.map(hero => (
        <div key={hero.id}>{hero.name}</div>
      ))}
    </div>
  );
}
```

#### `useAuth`

Hook para manejar la autenticación de usuarios.

**Estado:**
- `isAuthenticated: boolean` - Si el usuario está autenticado
- `token: string | null` - Token de autenticación
- `user: User | null` - Información del usuario
- `loading: boolean` - Estado de carga

**Métodos:**
- `login(data: LoginData)` - Iniciar sesión
- `register(data: RegisterData)` - Registrar nuevo usuario
- `logout()` - Cerrar sesión

**Ejemplo de uso:**
```typescript
import { useAuth } from '@/hooks';

function LoginPage() {
  const { login, loading, error } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    await login({ email, password });
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <p>Error: {error}</p>}
      <button disabled={loading}>Iniciar sesión</button>
    </form>
  );
}
```

### Helpers

#### `filterHeroesByName`

Filtra una lista de héroes por nombre.

**Parámetros:**
- `heroes: Hero[]` - Lista de héroes a filtrar
- `searchText: string` - Texto de búsqueda

**Retorna:**
- `Hero[]` - Lista de héroes filtrados

**Ejemplo:**
```typescript
import { filterHeroesByName } from '@/helpers';

const heroes = [
  { id: '1', name: 'Superman', ... },
  { id: '2', name: 'Batman', ... },
];

const filtered = filterHeroesByName(heroes, 'super');
```

### Tipos TypeScript

Los tipos están organizados por dominio en `src/types/`:

- **`hero.types.ts`**: Tipos relacionados con Héroes (`Hero`, `CreateHeroData`, `UpdateHeroData`, etc.)
- **`auth.types.ts`**: Tipos relacionados con Autenticación (`User`, `LoginData`, `RegisterData`, etc.)
- **`api.types.ts`**: Tipos genéricos para respuestas de API
- **`component.types.ts`**: Tipos para componentes

**Importación:**
```typescript
import type { Hero, CreateHeroData, User, AuthResponse } from '@/types';
```

## 🔒 Validaciones

### Héroes
- **name**: Requerido, entre 2 y 100 caracteres
- **description**: Opcional, máximo 60000 caracteres
- **power**: Opcional, máximo 100 caracteres

### Autenticación
- **username**: Requerido, mínimo 3 caracteres
- **email**: Requerido, formato de email válido
- **password**: Requerido, mínimo 6 caracteres (puede variar según política de Cognito)
