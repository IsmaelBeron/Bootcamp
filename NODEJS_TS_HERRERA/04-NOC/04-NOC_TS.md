# NODE - NOC

- Instalaciones necesarias (sin nodemon)

> npm init -y
> npm i -D typescript @types/node ts-node-dev rimraf
> npx tsc --init --outDir dist/ --rootDir src

- Scripts

~~~json
"dev": "tsnd --respawn src/app.ts",
"build": "rimraf ./dist && tsc",
"start": "npm run build && node dist/app.js"
~~~

- En el ts-config, fuera del "compilerOptions" excluyo los node_modules y la dist/ e incluyo el src

~~~json
"exclude": [
    "node_modules",
    "dist"
],
"include":[
    "src"
]
~~~
----

## Main - Server app

- Para esta aplicación vamos a hacer uso de arquitectura limpia y el patrón repositorio
- Creo la carpeta presentation con server.ts
- Creo la clase Server con el método start
- Poner public en el método es redundante ya que por defecto es un método público, pero ayuda a la legibilidad
- Con static no necesito hacer una instancia de la clase y puedo ussar el método directamente con Server
- server.ts
  
~~~js
export class Server {

    public static start(){
        
        console.log("Server started!")
    }
}
~~~

- Pongo en marcha el servidor con .start() en app.ts llamando a main dentro de función autoinvocada (puede ser async)

~~~js
import { Server } from "./presentation/server"

(async ()=>{
    main()
})()

function main(){
    Server.start()
}
~~~
-------

## CRON Tasks

> npm i cron 

- Uso CronJob
- Los asteriscos se refieren a los segundos, minutos, horas, etc (mirar documentación)

~~~js
import { CronJob } from "cron"

export class Server {

    public static start(){
        const job = new CronJob( 
            '*/2 * * * * *', //cada 2 segundos
            ()=>{
                const date = new Date()
                console.log('2 seconds', date)
            }
        )

        job.start()
    }
}
~~~

- De esta manera el código **está fuertemente acoplado**
- Siempre que uses librerías de terceros usa **EL PATRÓN ADAPTADOR**
- Creo la carpeta cron dentro de presentation (capa de presentación, de cara al usuario) con el archivo cron-service.ts
- Creo la clase CronService. Cómo no voy a usar inyección de dependencias (no necesito instancia), solo quiero un método, lo hago estático 
- **Retorno el job** por si quiero luego usar el .stop para detenerlo
- Pego el código del método start del server

~~~js
import { CronJob } from "cron"

export class CronService{
   
    static createJob(): CronJob{
        
        const job = new CronJob( 
            '*/2 * * * * *', //cada 2 segundos
            ()=>{
                const date = new Date()
                console.log('2 seconds', date)
            }
        )

        job.start()

        return job
    }
}
~~~

- Lo llamo en el server

~~~js
import { CronService } from "./cron/cron-service";


export class Server {

    public static start(){
        CronService.createJob()
    }
}
~~~

- **NOTA:**  **con CTRL + click encima de un método o clase voy a la información de las definiciones de TypeScript en index.d.ts**
- Necesito pasarle los parámetros al createJob para configurar el tiempo (**cronTime**) que quiero para que se ejcute cada vez, y la función que es **onTick**
- Necesito tipar estos dos parámetros. Cuando son objetos es mejor **interfaces**, pero cuando es un tipo de dato es mejor con un **type**
- Cuando hay **más de dos argumentos** se recomienda **usar un objeto y mandar un único argumento**

~~~js
import { CronJob } from "cron"


type CronTime = string | Date;
type OnTick = ()=> void

export class CronService{
   
    static createJob(cronTime: CronTime, onTick: OnTick ): CronJob {
        
        const job = new CronJob( cronTime, onTick)

        job.start()

        return job
    }
}
~~~

- Obviamente en server tengo que pasarle los parámetros al método createJob

~~~js
import { CronService } from "./cron/cron-service";


export class Server {

    public static start(){
        CronService.createJob('*/5 * * * * *', ()=>{
            const date = new Date();
            console.log('5 seconds', date)
        })
    }
}
~~~

- Hemos **aplicado el patrón adaptador**
- cron tiene algo llamado ChildProcess que permite el multihilo
------

## CheckService - UseCase

- 