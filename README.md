# Vape Lab

### Aplicación para realizar cálculos de alquimia para líquidos de vapeo.

## Iniciar el proyecto

Para iniciar el proyecto deberemos comenzar clonando el repositorio en la localización deseada y ejecutando los siguientes comandos

```
cd vape-lab
npm install
ionic serve --lab
```

Esto instalará todas las dependencias necesarias e iniciará el proyecto en la URL especificada.

## Ejecución en dispositivo móvil

Para ejecutar la aplicación en un dispositivo móvil podemos usar dos comadnos (sólo Android)

```
npm run android-dev
```

Este comando ejecutará la aplicaicón en el teléfono móvil conectado (necesario activar Depuración USB e Instalación de aplicaciones mediante USB en las opciones de desarrollador). Además, necesitaremos tener instalado previamente en nuestro equipo el SDK de Android, Java JDK y Gradle para poder compilar la aplicación.

Si queremos ejecutar la aplicación en producción deberemos usar este otro comando:

```
npm run android
```

## Ejecución en Ionic DevApp

Para ejecutar la aplicaicón en Ionic DevApp deberemos tener una cuenta de Ionic Pro y vincularla a nuestra aplicación, una vez hecho esto instalamos la aplicación Ionic DevApp e iniciamos sesión con nuestras credenciales. Para poder encontrar nuestro proyecto en la aplicación deberemos estar conectados a la misma red que nuestro equipo.

Ejecutamos el siguiente comando:

```
npm run devapp
```

**Nota**: Los plugins de Ionic Native no funcionarán ejecutando la aplicación de esta manera.

## Almacenamiento

La aplicación almacena los datos en la memoria del dispositivo mediante el plugin **storage** de Ionic, para poder ver los valores almacenados deberemos hacerlo con el Inspector de nuestro navegador.

## Dependencias

Este proyecto está usando **Ionic 3** y merece la pena revisar bien si se va a actualizar esta versión, ya que puede que algunos plugins o el enrutado no funcionen en nuevas versiones debido a los cambios hechos por el equipo de Ionic.

La versión de Angular usada en esta versión de Ionic es **Angular 5**.
