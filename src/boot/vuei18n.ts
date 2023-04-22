
import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import ru from '../translations/ru.json';

export default boot(({app}) => {
    const i18n = createI18n({
        messages: {
            ru
        },
        locale: 'ru',
    });
      
    app.use(i18n);
});