let mysql = require('mysql');
var connection = require('../config');
var constant = require('../constant');
const {Validator} = require('node-input-validator');

module.exports.update_highRiskCountry = function(req,res){  
    var zone_id = req.body.zone_id ? req.body.zone_id : 'QA';
    var country_code = req.body.country_code;
    var country_name = req.body.country_name;
    var risk_level = req.body.risk_level;
    var sanctioned_flag = req.body.sanctioned_flag;
    var ref_key = req.params.ref_key;
    if((ref_key == "")||(ref_key == 0)|| (ref_key == undefined)){
        res.json({
            status : 0,
            message : "ref key is required"
        });
        return;
    } else {
        const v = new Validator(req.body, {        
            country_code: 'required',
            country_name: 'required',
            risk_level: 'required',
            sanctioned_flag: 'required'
        });
        
        v.check().then((matched) => {
            if (!matched) {
                res.json({
                    status : 0,
                    message : v.errors,
                });
                return;
            }
        });

        var sql = "select * from high_risk_countries where COUNTRY_NAME like '%"+country_name+"%' and REF_KEY != "+ref_key;
        connection.query(sql, function(err,result,field){
            if(result.length >= 1){
                res.json({
                    status : 0,
                    message: "country name already exist."
                });
                return true;
            } else {
                var editSql = "update high_risk_countries set  COUNTRY_CODE ='"+country_code+"', COUNTRY_NAME = '"+country_name+"',RISK_LEVEL ='"+risk_level+"',SANCTIONED_FLAG = '"+sanctioned_flag+"',ZONE_ID ='"+zone_id+"'  where REF_KEY = '"+ref_key+"'";
                connection.query(editSql, function(err,result,field){
                    if((result.affectedRows > 0) || (result.affectedRows != undefined)){
                        res.json({
                            status : 1,
                            // result : result,
                            message : "Successfully update details."
                        });
                        return true;
                    } else {
                        res.json({
                            status : 0,
                            message : "Error found."
                        });
                        return true;
                    }
                });
            }
        });
    }
}

module.exports.update_blacklistedBic = function(req,res){  
    var bic = req.body.bic;
    var city = req.body.city;
    var zone_id = req.body.zone_id ? req.body.zone_id : 'QA';
    var country = req.body.country;
    var institution_name = req.body.institution_name;
    var bic8 = req.body.bic8;
    var watchlist_name = req.body.watchlist_name;
    var watchlist_type = req.body.watchlist_type;

    var ref_key = req.params.ref_key;
    if((ref_key == "")||(ref_key == 0)|| (ref_key == undefined)){
        res.json({
            status : 0,
            message : "ref key is required"
        });
        return;
    } else {
        const v = new Validator(req.body, {
            bic: 'required',
            bic8 : 'required',
            // country: 'required',
            // institution_name: 'required',
            // city: 'required'
        });
        
        v.check().then((matched) => {
            if (!matched) {
                res.json({
                    status : 0,
                    message : v.errors,
                });
                return;
            }
        });

        var editSql = "update blacklisted_bic set  BIC ='"+bic+"', INSTITUTION_NAME = '"+institution_name+"',CITY ='"+city+"',COUNTRY = '"+country+"',ZONE_ID ='"+zone_id+"',bic8 = '"+bic8+"', watchlist_name = '"+watchlist_name+"',watchlist_type='"+watchlist_type+"' where REF_KEY = "+ref_key;
        connection.query(editSql, function(err,result,field){
            if((result.affectedRows > 0) || (result.affectedRows != undefined)){
                res.json({
                    status : 1,
                    // result : result,
                    message : "Successfully update details."
                });
                return true;
            } else {
                res.json({
                    status : 0,
                    message : "Error found."
                });
                return true;
            }
        });
    }
}

module.exports.update_neutralWords = function(req,res){  
    var zone_id = req.body.zone_id ? req.body.zone_id : 'QA';
    var noise_word = req.body.noise_word;
    var ref_key = req.params.ref_key;
    if((ref_key == "")||(ref_key == 0)|| (ref_key == undefined)){
        res.json({
            status : 0,
            message : "ref key is required"
        });
        return;
    } else {
        const v = new Validator(req.body, {
            noise_word: 'required'
        });
        
        v.check().then((matched) => {
            if (!matched) {
                res.json({
                    status : 0,
                    message : v.errors,
                });
                return;
            }
        });

        var sql = "select * from neutral_words where NOISE_WORD like '%"+noise_word+"%' and REF_KEY != "+ref_key;
        connection.query(sql, function(err,result,field){
            if(result.length >= 1){
                res.json({
                    status : 0,
                    message: "noise word already exist."
                });
                return true;
            } else {
                var editSql = "update neutral_words set  NOISE_WORD ='"+noise_word+"', ZONE_ID ='"+zone_id+"'  where REF_KEY = "+ref_key;
                connection.query(editSql, function(err,result,field){
                    if((result.affectedRows > 0) || (result.affectedRows != undefined)){
                        res.json({
                            status : 1,
                            // result : result,
                            message : "Successfully update details."
                        });
                        return true;
                    } else {
                        res.json({
                            status : 0,
                            message : "Error found."
                        });
                        return true;
                    }
                });
            }
        });
    }
}

module.exports.update_sanctionedCities = function(req,res){  
    var zone_id = req.body.zone_id ? req.body.zone_id : 'QA';
    var sanctioned_city = req.body.sanctioned_city;
    var entry_type = req.body.entry_type;
    var ref_key = req.params.ref_key;
    if((ref_key == "")||(ref_key == 0)|| (ref_key == undefined)){
        res.json({
            status : 0,
            message : "ref key is required"
        });
        return;
    } else {
        const v = new Validator(req.body, {
            sanctioned_city: 'required',
            entry_type : 'required'
        });
        
        v.check().then((matched) => {
            if (!matched) {
                res.json({
                    status : 0,
                    message : v.errors,
                });
                return;
            }
        });

        var sql = "select * from sanctioned_cities where SANCTIONED_CITY like '%"+sanctioned_city+"%' and REF_KEY != "+ref_key;
        connection.query(sql, function(err,result,field){
            if(result.length >= 1){
                res.json({
                    status : 0,
                    message: "sanctioned city already exist."
                });
                return true;
            } else {
                var editSql = "update sanctioned_cities set SANCTIONED_CITY ='"+sanctioned_city+"',ENTRY_TYPE = '"+entry_type+"', ZONE_ID ='"+zone_id+"'  where REF_KEY = "+ref_key;
                connection.query(editSql, function(err,result,field){
                    if((result.affectedRows > 0) || (result.affectedRows != undefined)){
                        res.json({
                            status : 1,
                            // result : result,
                            message : "Successfully update details."
                        });
                        return true;
                    } else {
                        res.json({
                            status : 0,
                            message : "Error found."
                        });
                        return true;
                    }
                });
            }
        });
    }
}

module.exports.update_zoneGlobalKeywords = function(req,res){  
    var zone_id = req.body.zone_id ? req.body.zone_id : 'QA';
    var program_keyword = req.body.program_keyword;
    var ref_key = req.params.ref_key;
    if((ref_key == "")||(ref_key == 0)|| (ref_key == undefined)){
        res.json({
            status : 0,
            message : "ref key is required"
        });
        return;
    } else {
        const v = new Validator(req.body, {
            program_keyword: 'required'
        });
        
        v.check().then((matched) => {
            if (!matched) {
                res.json({
                    status : 0,
                    message : v.errors,
                });
                return;
            }
        });

        var sql = "select * from zone_x_global_wl_keywords where PROGRAM_KEYWORD like '"+program_keyword+"' and ZONE_ID ='"+zone_id+"' and REF_KEY != "+ref_key;
        connection.query(sql, function(err,result,field){
            if(result.length >= 1){
                res.json({
                    status : 0,
                    message: "program keyword already exist."
                });
                return true;
            } else {
                var editSql = "update zone_x_global_wl_keywords set PROGRAM_KEYWORD ='"+program_keyword+"', ZONE_ID ='"+zone_id+"'  where REF_KEY = "+ref_key;
                connection.query(editSql, function(err,result,field){
                    if((result.affectedRows > 0) || (result.affectedRows != undefined)){
                        res.json({
                            status : 1,
                            // result : result,
                            message : "Successfully update details."
                        });
                        return true;
                    } else {
                        res.json({
                            status : 0,
                            message : "Error found."
                        });
                        return true;
                    }
                });
            }
        });
    }
}

module.exports.update_internalListDef = function(req,res){  
    var zone_id = req.body.zone_id ? req.body.zone_id : 'QA';
    var list_type = req.body.list_type;
    var list_category = req.body.list_category;
    var watchlist_name = req.body.watchlist_name;
    var watchlist_id = req.body.watchlist_id;
    var ref_key = req.params.ref_key;
    if((ref_key == "")||(ref_key == 0)|| (ref_key == undefined)){
        res.json({
            status : 0,
            message : "ref key is required"
        });
        return;
    } else {
        const v = new Validator(req.body, {
            watchlist_name: 'required',
            watchlist_id: 'required',
            list_type: 'required'
        });
        
        v.check().then((matched) => {
            if (!matched) {
                res.json({
                    status : 0,
                    message : v.errors,
                });
                return;
            }
        });

        var editSql = "update internal_list_def set LIST_TYPE ='"+list_type+"',LIST_CATEGORY ='"+list_category+"',WATCHLIST_NAME ='"+watchlist_name+"',WATCHLIST_ID='"+watchlist_id+"', ZONE_ID ='"+zone_id+"'  where REF_KEY = "+ref_key;
        connection.query(editSql, function(err,result,field){
            if((result.affectedRows > 0) || (result.affectedRows != undefined)){
                res.json({
                    status : 1,
                    // result : result,
                    message : "Successfully update details."
                });
                return true;
            } else {
                res.json({
                    status : 0,
                    message : "Error found."
                });
                return true;
            }
        });
    }
}

module.exports.update_internalWatchList = function(req,res){  
    // var uid_serial_no = req.body.uid_serial_no;
    var zone_id = req.body.zone_id;
    var watchlist_id = req.body.watchlist_id;
    var watchlist_name = req.body.watchlist_name;
    var customer_name_english = req.body.customer_name_english;
    var customer_name_arabic = req.body.customer_name_arabic;
    var customer_type = req.body.customer_type;
    var city = req.body.city;
    var customer_account = req.body.customer_account;
    var dob = req.body.dob;
    var residence_country = req.body.residence_country;
    // var residence_country_flag = req.body.residence_country_flag;
    var nationality = req.body.nationality;
    var id_number = req.body.id_number;
    var id_type = req.body.id_type;
    var known_as_name_english = req.body.known_as_name_english;
    var known_as_name_arabic = req.body.known_as_name_arabic;
    var mother_name = req.body.mother_name;
    var address = req.body.address;
    var remarks = req.body.remarks;
    var cin = req.body.cin;
    var new_pan = req.body.new_pan;
    var source = req.body.source;
    var customer_status = req.body.customer_status;
    var branch = req.body.branch;
    var br_code = req.body.br_code;
    var customer_risk_level = req.body.customer_risk_level;
    var customer_create_date = req.body.customer_create_date;
    var cust_risk_level_update_date = req.body.cust_risk_level_update_date;
    var politically_exposed = req.body.politically_exposed;
    var details_programs = req.body.details_programs;
    var others_remarks = req.body.others_remarks;
    var others_data_sources = req.body.others_data_sources;
    var others_related_to = req.body.others_related_to;
    
    var ref_key = req.params.ref_key;
    if((ref_key == "")||(ref_key == 0)|| (ref_key == undefined)){
        res.json({
            status : 0,
            message : "ref key is required"
        });
        return;
    } else {
        const v = new Validator(req.body, {
            customer_name_english: 'required',
            watchlist_id: 'required',
            watchlist_name: 'required',
            // customer_type : 'required',
            city : 'required',
            nationality : 'required',
            residence_country : 'required'
        });
        
        v.check().then((matched) => {
            if (!matched) {
                res.json({
                    status : 0,
                    message : v.errors,
                });
                return;
            }
        });

        var editSql = "update internal_watch_list set CUSTOMER_NAME_ENGLISH ='"+customer_name_english+"',CUSTOMER_NAME_ARABIC ='"+customer_name_arabic+"',WATCHLIST_NAME ='"+watchlist_name+"',WATCHLIST_ID='"+watchlist_id+"', CITY ='"+city+"'  ,CUSTOMER_TYPE='"+customer_type+"', CUSTOMER_ACCOUNT ='"+customer_account+"',DOB='"+dob+"', RESIDENCE_COUNTRY ='"+residence_country+"', NATIONALITY ='"+nationality+"',ID_NUMBER='"+id_number+"', ID_TYPE ='"+id_type+"',KNOWN_AS_NAME_ENGLISH='"+known_as_name_english+"', KNOWN_AS_NAME_ARABIC ='"+known_as_name_arabic+"',MOTHER_NAME='"+mother_name+"', ADDRESS ='"+address+"',REMARKS='"+remarks+"', CIN ='"+cin+"',NEW_PAN='"+new_pan+"', SOURCE ='"+source+"',CUSTOMER_STATUS='"+customer_status+"', BRANCH ='"+branch+"',BR_CODE='"+br_code+"', CUSTOMER_RISK_LEVEL ='"+customer_risk_level+"',CUSTOMER_CREATE_DATE='"+customer_create_date+"', CUST_RISK_LEVEL_UPDATE_DATE ='"+cust_risk_level_update_date+"',POLITICALLY_EXPOSED='"+politically_exposed+"', DETAILS_PROGRAMS ='"+details_programs+"',OTHERS_REMARKS='"+others_remarks+"', OTHERS_DATA_SOURCES ='"+others_data_sources+"',OTHERS_RELATED_TO='"+others_related_to+"',ZONE_ID ='"+zone_id+"' where UID_SERIAL_NO = "+ref_key;
        connection.query(editSql, function(err,result,field){
            if((result.affectedRows > 0) || (result.affectedRows != undefined)){
                res.json({
                    status : 1,
                    // result : result,
                    message : "Successfully update details."
                });
                return true;
            } else {
                res.json({
                    status : 0,
                    message : "Error found."
                });
                return true;
            }
        });
    }
}