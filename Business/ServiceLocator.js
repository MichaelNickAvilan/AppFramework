var ServiceLocator = {
	countryRequest: function ($host, $callback) {
        Alert.showLoadingAlert();
        AjaxDelegate.requestInfo(
            $host+'app/api/php/proxys/countriesproxy.php',
            {
                service: 6
            }, 'post', 'json',
            function () {
                Alert.hide();
                $callback();
            });
    },
    getLandingRequest: function ($id_landing , $callback) {
    	Alert.showLoadingAlert();
        AjaxDelegate.requestInfo(
            UniversalModel.a_db_path+UniversalModel.a_landings_proxy,
            {
              service: 5,
              id_landing: $id_landing,
            }, 'post', 'json',
            function () {
                Alert.hide();
                $callback();
            });
    }, 
    getSocialsRequest: function ($id_landing , $callback) {
        Alert.showLoadingAlert();
        AjaxDelegate.requestInfo(
            UniversalModel.a_db_path+UniversalModel.a_social_proxy,
            {
              service: 3,
              id_landing: $id_landing,
            }, 'post', 'json',
            function () {
                Alert.hide();
                $callback();
            });
    },    
    getCultureRequest: function ($id_landing , $callback) {
        Alert.showLoadingAlert();
        AjaxDelegate.requestInfo(
            UniversalModel.a_db_path+UniversalModel.a_culture_proxy,
            {
              service: 3,
              id_landing: $id_landing,
            }, 'post', 'json',
            function () {
                Alert.hide();
                $callback();
            });
    },
    getSectionRequest: function ($id_culture, $callback) {
        Alert.showLoadingAlert();
        AjaxDelegate.requestInfo(
            UniversalModel.a_db_path+UniversalModel.a_section_proxy,
            {
              service: 3,
              id_culture: $id_culture,
            }, 'post', 'json',
            function () {
                Alert.hide();
                $callback();
            });
    },
     getModulesRequest: function ($id_section, $callback) {
        Alert.showLoadingAlert();
        AjaxDelegate.requestInfo(
            UniversalModel.a_db_path+UniversalModel.a_modules_proxy,
            {
              service: 3,
              id_section: $id_section,
            }, 'post', 'json',
            function () {
                Alert.hide();
                try{
               		 $callback(); 	
                }catch(e){
                	
                }finally{
                	
                }
                
               
            });
    },
     getBannersRequest: function ($id_module, $callback) {
        Alert.showLoadingAlert();
        AjaxDelegate.requestInfo(
            UniversalModel.a_db_path+UniversalModel.a_banners_proxy,
            {
              service: 3,
              id_module: $id_module,
            }, 'post', 'json',
            function () {
                Alert.hide();
                $callback();
            });
    },
    getPostsRequest: function ($id_module, $callback) {
        Alert.showLoadingAlert();
        AjaxDelegate.requestInfo(
            UniversalModel.a_db_path+UniversalModel.a_posts_proxy,
            {
              service: 3,
              id_module: $id_module,
            }, 'post', 'json',
            function () {
                Alert.hide();
                $callback();
            });
    },
     getFormLandingRequest: function ($id_landing, $callback) {
        Alert.showLoadingAlert();
        AjaxDelegate.requestInfo(
            UniversalModel.a_db_path+UniversalModel.a_formsLanding_proxy,
            {
              service: 3,
              id_landing: $id_landing,
            }, 'post', 'json',
            function () {
                Alert.hide();
                $callback();
            });
    },
    insertLeadRequest: function ($id_form, $fields_lead, $date_lead, $callback) {
        Alert.showLoadingAlert();
        AjaxDelegate.requestInfo(
            UniversalModel.a_db_path+UniversalModel.a_leads_proxy,
            {
              service: 1,
              origin:'landing',
              id_form: $id_form,
              fields_lead:$fields_lead,
              date_lead:$date_lead
            }, 'post', 'json',
            function () {
                Alert.hide();
                $callback();
            });
    },
    userLoginRequest: function ($email_user,$passwor_user, $callback) {
        Alert.showLoadingAlert();
        AjaxDelegate.requestInfo(
            UniversalModel.a_db_path+UniversalModel.a_page_users_proxy,
            {
              service: 3,
              email_page_user: $email_user,
              password_page_user:$passwor_user
            }, 'post', 'json',
            function () {
                Alert.hide();
                $callback();
            });
    }
};