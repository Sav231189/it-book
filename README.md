# It-BooK

## Web-приложение для структурированного хранения информации в блочным формате.

Рабочий пример приложения:

[https://it-infobox.web.app](https://it-infobox.web.app).


## Для тестирования приложения на своем ПК:

1. Необходимо добавить свой проект на платформе FireBase [Google](https://firebase.google.com/).
2. Добавить в проект Cloud Firestore [Cloud Firestore](https://firebase.google.com/docs/firestore).
3. В корне src создать файл firebaseConfig.js
4. Заполнить конфигурацию своего проекта FireBase:

    import firebase from 'firebase/app'   
    import 'firebase/auth'    
    import 'firebase/database'    
      
    let firebaseConfig = {    
    apiKey: "AI################################8B3rw",    
    authDomain: "######.firebaseapp.com",   
    projectId: "id####",    
    storageBucket: "#########.appspot.com",    
    messagingSenderId: "########3593",    
    appId: "1:############:web:##########2416######4c",   
    measurementId: "#-#############"   
    };    
    
    // Initialize Firebase    
    firebase.initializeApp(firebaseConfig);   
