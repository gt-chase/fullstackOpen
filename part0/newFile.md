sequenceDiagram
  participant browser
  participant server

  browser->>server: POST request to  /exampleapp/new_note submit clicked
  activate server
    server-->>browser: New Note Form 
    deactivate server

  browser->>server: GET	/exampleapp/notesnew_note
  activate server
    server-->>browser: The HTML
    deactivate server
  
  browser->>server: GET request /exampleapp/main.css
  activate server
    server-->>browser: the css file
    deactivate server
  
  browser->>server: GET request /exampleapp/main.js
  activate server
    server-->>browser: the javascript file
    deactivate server
  
  browser->>server: GET request 	/exampleapp/data.json
  activate server
    server-->>browser: the json data changes depending on all the user submited data. 
    deactivate server
