# Playwright_Automation

# "Playwright_Automation" Coding Automation Challenge by Pablo M.Calvano
The following is a Playwright + Typescript test execution which has been developed with simplicity in mind. Its purpose is to follow the guidelines from the code challenge:


## Code Challenge Requirements:
Debe ser resuelto en 24hs, es decir desde que se envía el mail a tener la respuesta.

Ejercicio de automatización:
    Utilizando la siguiente página The Internet (the-internet.herokuapp.com) realizar los siguientes tests:
        /dropdown: seleccionar un valor y luego cambiarlo validando su valor en cada interacción
        /login: realizar los tests convenientes para validar su funcionamiento
        /tables: Data Tables: ordenar una de las tablas de mayor a menor por cualquier columna y validar el Due de la fila 2
        Enviar el repositorio del ejercicio.

## Test Cases created
- /dropdown: 'Innoit - QA AUTOMATION EXERCISE - Dropdown page'.
    - 'Test 1: Seleccionar un valor y luego cambiarlo validando su valor en cada interacción'.

- /login : 'Innoit - QA AUTOMATION EXERCISE - Login Page'
    - 'Test 2: Login sucessfull'.
    - 'Test 2: Login error: invalid username'.
    - 'Test 2: Login error: invalid password'.
    - 'Test 2: Login error: invalid username & password - empty value'.

- /tables: 'Innoit - QA AUTOMATION EXERCISE - Tables Page'
    - 'Ordenar una de las tablas de mayor a menor por cualquier columna'

# Additional Notes
- I'm aware there is some room for improvement, but I created the test framework on the amount of time I had.
- I wanted to show a Testing framework with some differnet ways of crearting / ordering the test cases into using hooks , creating several tests or runing a test with multiple steps, adding different "test.decribes" on each page , it can be all created under the umbrealla of "Innoit Coding challenge" but I Wanted to make it for each page, I can also create one spec file per page tested so we can follow some POM design pattern but i wanted to create an easy to read document.
- On the last test I left some notes with the issues I had and how would I approach the issue if I had more time on a "real world scenario".
-  Thanks for taking the time to read this notes and my codde.


