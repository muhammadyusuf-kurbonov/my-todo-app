
import { initializeApp } from 'firebase/app';
import { boot } from 'quasar/wrappers';
import { VueFire } from 'vuefire';

export default boot(({app}) => {
    const firebaseConfig = {
        apiKey: 'AIzaSyBOy-sOJ0OCV7TPr-uz_oY6YjDATl1_Syw',
        authDomain: 'my-todo-list-f4b79.firebaseapp.com',
        projectId: 'my-todo-list-f4b79',
        storageBucket: 'my-todo-list-f4b79.appspot.com',
        messagingSenderId: '812009543123',
        appId: '1:812009543123:web:2092e94a8983483a8b0b26',
        measurementId: 'G-YB2XRG50YY'
    };

    const firebaseApp = initializeApp(firebaseConfig);

    app.use(VueFire, {
        firebaseApp,
        modules: [],
    });
});