var MainScript = {

    a_data: {
        products: [], garage: 0, deposit: 0, floors: 0,
        templates: { owner: '', client: '' }, owner: {mail:'', name:''}
    },

    init: function () {
        MainScript.addListeners();
        MainScript.startApp();
    },
    addListeners: function () {
    },
    startApp: function () {
        Mailer.init('PHP');
        FormsUtils.fieldRestrictDelegate('Letters', TextPerformance.getField('name_txt'));
        FormsUtils.fieldRestrictDelegate('Numbers', TextPerformance.getField('phone_txt'));
        AjaxDelegate.readXML('data/data.xml', MainScript.dataComplete);
    },
    dataComplete: function ($data) {
        console.log($data)//20;
        var products = $data.childNodes[0].childNodes[1].children;
        MainScript.a_data.garage = $data.childNodes[0].childNodes[3].children[0].innerHTML;
        MainScript.a_data.deposit = $data.childNodes[0].childNodes[3].children[1].innerHTML;
        MainScript.a_data.floors = Number($data.childNodes[0].childNodes[3].children[4].innerHTML);
        MainScript.a_data.templates.owner = String($data.childNodes[0].childNodes[5].children[0].innerHTML).split('<![CDATA[').join('').split(']]>').join('');
        MainScript.a_data.templates.client = String($data.childNodes[0].childNodes[5].children[1].innerHTML).split('<![CDATA[').join('').split(']]>').join('');
        console.log($data.childNodes[0].childNodes[5].children[2].children[0].innerHTML);
        MainScript.a_data.owner.mail = $data.childNodes[0].childNodes[5].children[2].children[0].innerHTML;
        MainScript.a_data.owner.name = $data.childNodes[0].childNodes[5].children[2].children[1].innerHTML;
        for (var i = 0; i < products.length; i++) {
            MainScript. a_data.products.push({
                    name: products[i].children[0].innerHTML,
                    description: products[i].children[1].innerHTML,
                    value: products[i].children[2].innerHTML,
                    floor: products[i].children[3].innerHTML,
                    image: products[i].children[4].innerHTML
                }
            );
        }
        MainScript.renderData();
    },
    renderData: function () {
        var floors = [];
        var deposits = [];
        var garages = [];
        for (var i = 0; i < MainScript.a_data.floors; i++) {
            floors.push({ label: 'Piso '+(i+1), value: (i+1)});
        }
        for (var j = 0; j < MainScript.a_data.garage; j++) {
            deposits.push({ label: 'Num. Estacionamientos: ' + (j + 1), value: (j + 1) });
        }
        for (var k = 0; k < MainScript.a_data.deposit; k++) {
            garages.push({ label: 'Num. Depósitos ' + (k + 1), value: (k + 1) });
        }
        Combos.populateCombo('floors_combo', floors);
        Combos.populateCombo('garages_combo', garages);
        Combos.populateCombo('deposits_combo', deposits);
        MainScript.selectedFloor();
    },
    selectedFloor: function () {
        var products = [];
        for (var i = 0; i < MainScript.a_data.products.length; i++) {
            if (Combos.getCombo('floors_combo').value === MainScript.a_data.products[i].floor) {
                products.push({ label: MainScript.a_data.products[i].name, value: MainScript.a_data.products[i].name });
            }
        }
        Combos.populateCombo('products_combo', products);
        MainScript.setSelectedProduct();
    },
    setSelectedProduct: function () {
        for (var i = 0; i < MainScript.a_data.products.length; i++) {
            if (MainScript.a_data.products[i].name === Combos.getCombo('products_combo').value &&
               MainScript.a_data.products[i].floor === Combos.getCombo('floors_combo').value) {
                TextPerformance.getField('banner_img').src = MainScript.a_data.products[i].image;
                TextPerformance.getField('productDescription_div').textContent = MainScript.a_data.products[i].description;
            }
        }
    },
    sendData: function () {
        var validator = FormsUtils.validateFields(['name_txt', 'phone_txt', 'mail_txt'], ['Debes ingresar un nombre', 'Debes ingresar un teléfono', 'Debes ingresar un correo']);
        var mailto = [];
        mailto.push(Mailer.getRecipient(MainScript.a_data.owner.mail,
                    MainScript.a_data.owner.name));
        if (validator.valid === true) {
            var mail_validator = FormsUtils.validateMail('mail_txt');
            if (mail_validator.valid === true) {
                Alert.showLightboxMessageAlert('Listos para enviar el correo');
                Mailer.sendGMAILMessage(
                    0,                                  //Debug options 
                    'quotergreen@gmail.com',            //Mail from
                    'Quoter system',                    //Main from name 
                    JSON.stringify(Mailer.getMailObject(
                        mailto,
                        [], [], [], []
                    )),                                 //Recipients
                    'ESP',                              //Lang
                    'Nueva cotizaci&oacute;n',          //Subject
                    Mailer.getTemplate(
                        MainScript.a_data.templates.owner, 
                        [
                            { field: 'client_name', value: TextPerformance.getValue('name_txt') },
                            { field: 'client_mail', value: TextPerformance.getValue('mail_txt') },
                            { field: 'client_phone', value: TextPerformance.getValue('phone_txt') },
                            { field: 'floor', value: Combos.getCombo('floors_combo').value },
                            { field: 'area', value: Combos.getCombo('products_combo').value },
                            { field: 'deposits', value: Combos.getCombo('deposits_combo').value },
                            { field: 'parking', value: Combos.getCombo('garages_combo').value },
                        ]
                    ),  //Body HTML
                    '',                                 //Alt body
                    MainScript.ownerMailComplete        //Mail Complete
                    );
            } else {
                Alert.showLightboxMessageAlert(mail_validator.message);
            }
        } else {
            Alert.showLightboxMessageAlert(validator.message);
        }
    },
    ownerMailComplete: function ($data) {
        var mailto = [];
        mailto.push(Mailer.getRecipient(TextPerformance.getValue('mail_txt'),
                    TextPerformance.getValue('name_txt')));
        Mailer.sendGMAILMessage(
                    0,                                  //Debug options 
                    'quotergreen@gmail.com',            //Mail from
                    'Quoter system',                    //Main from name 
                    JSON.stringify(Mailer.getMailObject(
                        mailto,
                        [], [], [], []
                    )),                                 //Recipients
                    'ESP',                              //Lang
                    'Nueva cotizaci&oacute;n',          //Subject
                    Mailer.getTemplate(
                        MainScript.a_data.templates.client,
                        [
                            { field: 'client_name', value: TextPerformance.getValue('name_txt') },
                            { field: 'client_mail', value: TextPerformance.getValue('mail_txt') },
                            { field: 'floor', value: Combos.getCombo('floors_combo').value },
                            { field: 'area', value: Combos.getCombo('products_combo').value },
                            { field: 'deposits', value: Combos.getCombo('deposits_combo').value },
                            { field: 'parking', value: Combos.getCombo('garages_combo').value },
                        ]
                    ),  //Body HTML
                    '',                                 //Alt body
                    MainScript.clientMailComplete        //Mail Complete
                    );
        Alert.showLightboxMessageAlert($data.message);
    },
    clientMailComplete: function () {
        FormsUtils.cleanForm(['name_txt', 'mail_txt', 'phone_txt']);
    }
};
MainScript.init();