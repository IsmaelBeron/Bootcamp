# 03 Sección testing NODE_TS HERRERA

- Esta sección trata de hacer testing con las funciones y adaptadores de la sección 1

## Introducción

- El testing no es una pérdida de tiempo
- Las pruebas unitarias estan enfocadas en pequeñas funcionalidades
- Las pruebas de integración están enfocadas en cómo trabajan varias piezas en conjunto
- Tienen que ser fáciles de escribir, leer, confiables, rápidas
- Principalmente se harán unitarias
- Sigue las tres A's
  - A de Arrange (arreglar)
    - Inicializamos variables, realizamos las importaciones necesarias...
  - A de Act (actuar)
    - Aplicamos acciones, estimulos: llamar métodos, simular clicks, realizar acciones sobre el paso anterior... 
  - A de Assert (afirmar)
    - Observar el comportamiento resultante
-----

## Configuración testing


> npm i -D jest @types/jest ts-jest supertest

- Crear archivo de configuración de Jest

> npx jest --init

- Le digo que si al coverage, y v8. Clear mocks (normalmente si pero para aprender no)

- En jest.config.js

~~~js
preset: 'ts-jest',
testEnvironment: "jest-environment-node",

//opcional
setupFiles: ['dotenv/config']
~~~

- Scripts:

~~~json
"test": "jest",
"test:watch":"jest --watch",
"test:coverage": "jest --coverage"
~~~

- Pequeña prueba: creo la carpeta src/test/app.test.ts
- app.test.ts

~~~js
describe('App', ()=>{
    it('should be true', ()=>{
        expect(true).toBe(true)
    })
})
~~~

- Ejecutar con npm run test
- Puede ser que en el futuro de un error en el que diga que el jest.config.ts está fuera del rootDir (o similar)
- Añade esto antes del compilerOptions, dentro del objeto JSON del tscongif

~~~json
{
  "include": ["src/**/*"],
  "exclude":  ["node_modules", "**/*/spec.ts", "**/*/test.ts"],
  "compilerOptions": {
 }}
~~~
------

## Arrange, Act y Assert

- 