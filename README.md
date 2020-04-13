# Vape Lab

### Aplicación para calcular proporciones en líquidos para vapear

## Motivación
Este proyecto se inció para ayudarme a mí mismo a realizar los cálculos de las proporciones usadas en los líquidos para vapear.

Los líquidos para vapear que se pueden preparar en casa se componen de varios ingredientes, no siendo estos siempre los mismos ni las mismas cantidades, ésto depende de los gustos de cada persona, o de la cantidad de nicotina que quiera incluir en el líquido.

Esta aplicación ayuda a estas personas a calcular correctamente todas las cantidades que necesitan ser mezcladas para obtener un líquido final correcto.

## Iniciar el proyecto

Para iniciar el proyecto deberemos comenzar clonando el repositorio en la localización deseada y ejecutando los siguientes comandos

```
cd vape-lab
npm install
ionic serve --lab
```

Esto instalará todas las dependencias necesarias e iniciará el proyecto en la URL de desarrollo (normalmente localhost).

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

La aplicación almacena los datos en el almacenamiento del dispositivo mediante el plugin **storage** de Ionic, para poder ver los valores almacenados deberemos hacerlo con el Inspector de nuestro navegador.

## Dependencias

Este proyecto está usando actualmente la versión **3 de Ionic*
