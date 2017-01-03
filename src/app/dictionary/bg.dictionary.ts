import { Injectable } from '@angular/core';

@Injectable()
export class BulgarianDictionary {
    public language = {
        "homePageTitle": "Всичко за вашия компютър на най-конкурентни цени в Жиланов ЕООД!",
        "productPageTitle": "",
        "contactPageTitle": "Връзка с Жиланов ЕООД",
        "viewPageTitle": "Преглед на {{product}} в Жиланов ЕООД",
        "cartPageTitle": "Количка с поръчки от Жиланов ЕООД",
        "loginPageTitle": "Регистрация в Жиланов ЕООД",
        "profilePageTitle": "Вашия профил в Жиланов ЕООД",

        "homePageBigTitle": "Промоции",
        "homePageDescription": "Промоции описание",
        "headerContact": "Контакти",
        "headerCompany": "ЖИЛАНОВ ЕООД",
        "headerUsername": "Вход в профила",
        "headerShopByType": "Пазарувай по марка",
        "headerSearch": "Търси",
        "headerSearchFor": "Потърси...",
        "headerYourProfile": "Профилът ви",

        "cartHeader": "Вашата количка с поръчки:",
        "storedAmount": "Остават още само",
        "amount": "бройки",
        "emptyCart": "Вашата количка с поръчки е все още празна. ",
        "cartSum": "Обща сума:",
        "undefinedPrice": "По договаряне",

        "contactHeader": "За връзка с нас:",
        "contactMarker": "Координати",
        "contactAddress": "Улица Могилите. София 1836",
        "contactOurAddress": "Адрес",
        "contactCoordinateAdress": "жк.Левски Г,ул. Могилите бл.4, София 1836",
        "contactPhoneTitle": "Телефон за връзка",
        "contactPhone": "0878613400 , 0878422063",
        "contactRules": "Посещения на място след предварително договаряне!",
        "contactFormTitle": "Може да ни изпратите запитване през формата",
        "contactOrderTitle": "Може да направите поръчка през формата",
        "contactFormYourName": "Вашето име",
        "contactFormYourNameEnter": "Въведете вашето име",
        "contactFormYourEmail": "Вашата електронна поща",
        "contactFormYourEmailEnter": "Въведете вашата електронна поща",
        "contactFormYourPhoneNumber": "Вашия телефонен номер",
        "contactFormYourPhoneNumberEnter": "Въведете вашия телефонен номер",
        "contactFormYourMoreInfo": "Забележки и допълнителна информация",
        "contactFormYourMoreInfoEnter": "Въведете забележки и допълнителна информация",
        "contactFormYourMessage": "Вашето съобщение",
        "contactFormYourMessageEnter": "Въведете вашето съобщение",
        "contactYourAddress": "Адреса ви за доставка",
        "contactYourAddressEnter": "Въведете адреса ви за доставка",
        "contactFormSend": "Изпрати",
        "contactCaptchaTitle": "Грешно попълнена анти бот система!",
        "contactCaptcha": "Моля попълнете правилно анти бот проверката.",
        "contactMessageSuccess": "Съобщението е получено успешно!",
        "contactMessageRecieved": "Ще се свържем с вас при първа възможност",
        "contactOrderSuccess": "Поръчката е получена успешно!",
        "contactOrderRecieved": "Ще се свържем с вас при първа възможност",
        "contactMessageFail": "Възникна грешка при изпращането на съобщението!",
        "contactMessageNotRecieved": "Моля обадете се на нашия телефонен номер: ",

        "loginFormTitle": "Моля въведете вашия акаунт и парола",
        "loginFormUsername": "Вашия акаунт",
        "loginFormUsernameEnter": "Въведете вашия акаунт",
        "loginFormPassword": "Вашата парола",
        "loginFormPasswordEnter": "Въведете вашата парола",

        "productNew": "Нов",
        "productOffer": "Оферта",
        "productView": "Бърз преглед",
        "productOver": "Изчерпан",
        "productViewMore": "Преглед отблизо",
        "productAmount": "Количество",
        "productMinAmount": "Минималното количество за покупка на продукта е",
        "productAddToCart": "Добавяне към количката",

        "addToCart": "Добавяне в количката",
        "addToCartSuccess": "Успешно добавяне към количката с поръчки",
        "removeFromCartSuccess": "Успешно премахване на поръчката",
        "continueToPay": "Продължаване към поръчване",
        "orderRecieved": "Поръчката е получена успешно!",
        "price": "Цена",
        "products": "Продукти",
        "currency": "лева",

        "detailsBy": "производител:",
        "detailsStock": "налична",
        "detailsNotStock": "Очакваме доставка",
        "detailsStatus": "Статус:",

        "loginHeader": "Моля попълнете формата за да влезете в профила си",
        "loginEmail": "Вашият e-mail адрес",
        "loginPassword": "Вашата парола",
        "loginRemember": "Автоматичен вход",
        "loginLogin": "Вход в профила ви",
        "loginOr": "или",
        "loginRegister": "Регистрирай се",
        "loginRegisterHeader": "Моля попълнете формата за да се регистрирате",
        "loginRegisterRepeat": "Моля повторете паролата",

        "profileProfile": "Вашият профил",
        "profileMessages": "Вашите съобщения",
        "profileOrders": "Вашите покупки",
        "profileFull": "Попълнете вашия профил, за да можем да се свържем и изпратим стоката по лесно до вас",
        "profileNames": "Въведете вашите 3 имена",
        "profilePhone": "Въведете вашия телефон за връзка",
        "profileAddress": "Въведете вашия адрес за връзка",
        "profileOther": "Въведете допълнителна информация, която би ни била полезна за свързването с вас",
        "profileSave": "ЗАПАЗИ",
        "profileOnSave": "Всички промени по профила ви са запазени",
        "profileSignOut": "Изход от профила",
        "profileRecievedMessage": "Изпратено от вас",
        "profileSendedMessage": "Изпратено до вас",
        "profileDateMessage": "Дата на изпращане",
        "profileMessage": "Съобщение",
        "profileOrdersStatus": "Статус на поръчката",
        "profileOrdersStatusRecieved": "Получена",
        "profileOrdersStatusNotRecieved": "Не получена",
        "profileOrdersAmount": "на брой.",
        
        "errorFetchFromServer": "Изнинка грешка при свързването със сървъра",
        "errorWrongPassword": "Въвели сте грешен е-мейл или парола. Опитайте отново.",
        "errorDifferentPasswords": "Паролите не съвпадат. Моля попълнете ги наново",
        "successSendMessage": "Съобщението е изпратено",
        "resolveCaptcha": "Моля попълнете правилно анти бот система.",

        // product modal
        "productTitle": "Заглавие",
        "productDescription": "Описание",
        "productMoreInfo": "Допълнително информация",
        "productMoreDetails": "Допълнително детайли",
        "productCategory": "Категория",
        "productMainImage": "Главна картина",
        "productOtherImages": "Други картини",
        "productNewPrice": "Нова цена",
        "productOldPrice": "Стара цена",
        "productDailyOffer": "Оферта на деня",
        "productZIndex": "Позиция",
        "productShown": "Видим",
        "productCount": "Наличен брой",
        "productParams": "Параметри",
        "productRating": "Рейтинг",
        "productIsNew": "Ново",
        "productCarousel": "Показване на началната въртележка",
        "productLink": "Линк на продукта",
        "productMake": "Производител",

        "name": "Име",
        "loading": "Зареждане",

        "deleteBtn": "Изтриване",
        "editProduct": "Промени продукта",
        "createProduct": "Добави нов продукт",

        "changeWasSccessful": "Вашата промяна беше успешна.",
    }
}