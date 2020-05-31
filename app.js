var express = require('express');
var bodyParser = require('body-parser');
var app = express();
let mysql = require('mysql');
var path = require('path');
var request = require('ajax-request');
const requests = require('request');
var http = require('http');
var async = require("async");
var cors = require('cors');
const v = require('node-input-validator');
var server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var config = require('./config');
var listingCtrl = require('./routes/listing_api');
var addingCtrl = require('./routes/add_api');
var deleteCtrl = require('./routes/delete_api');
var updateCtrl = require('./routes/update_api');


app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,X-Requested-With');//Content-Type: application/json
    res.setHeader('Access-Control-Allow-Credentials', false);
    var originalUrl = req.originalUrl;
    console.log(originalUrl);
    console.log(req.body);
    next();
});


app.post('/api/login', listingCtrl.login);
// Listing of all data
app.get('/api/internal_list', listingCtrl.internal_list);
app.get('/api/internal_watchlist', listingCtrl.internal_watchlist);
app.get('/api/blacklist_bic', listingCtrl.blocklist_bic);
app.get('/api/neutral_words', listingCtrl.neutral_words);
app.get('/api/sanctioned_cities', listingCtrl.sanctioned_cities);
app.get('/api/zone_x_global_keywords', listingCtrl.zone_x_global_keywords);
app.get('/api/high_risk_countries', listingCtrl.high_risk_countries);

// Add functionality on all data
app.post('/api/add_highRiskCountry', addingCtrl.add_highRiskCountry);
app.post('/api/add_neutral_words', addingCtrl.add_neutral_words);
app.post('/api/add_sanctioned_cities', addingCtrl.add_sanctioned_cities);
app.post('/api/add_zone_global_keywords', addingCtrl.add_zone_global_keywords);
app.post('/api/add_blacklisted_bic', addingCtrl.add_blacklisted_bic);
app.post('/api/add_internal_watchlist', addingCtrl.add_internal_watchlist);
app.post('/api/add_internal_list_def', addingCtrl.add_internal_list_def);

// Update functionality on all data
app.put('/api/update_highRishCountry/:ref_key',updateCtrl.update_highRiskCountry);
app.put('/api/update_blacklistedBic/:ref_key',updateCtrl.update_blacklistedBic);
app.put('/api/update_neutralWords/:ref_key',updateCtrl.update_neutralWords);
app.put('/api/update_sanctionedCities/:ref_key',updateCtrl.update_sanctionedCities);
app.put('/api/update_zoneGlobalKeywords/:ref_key',updateCtrl.update_zoneGlobalKeywords);
app.put('/api/update_internalListDef/:ref_key',updateCtrl.update_internalListDef);
app.put('/api/update_internalWatchList/:ref_key',updateCtrl.update_internalWatchList);

// Delete functionality on all data
app.delete('/api/del_internal_watchlist/:ref_key',deleteCtrl.del_internal_watchlist);
app.delete('/api/del_internal_list/:ref_key',deleteCtrl.del_internal_list);
app.delete('/api/del_highRiskCountry/:ref_key',deleteCtrl.del_highRiskCountry);
app.delete('/api/del_blacklisted_bic/:ref_key',deleteCtrl.del_blacklisted_bic);
app.delete('/api/del_neutral_words/:ref_key',deleteCtrl.del_neutral_words);
app.delete('/api/del_sanctioned_cities/:ref_key',deleteCtrl.del_sanctioned_cities);
app.delete('/api/del_zone_global_keywords/:ref_key',deleteCtrl.del_zone_global_keywords);

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Magic happens at http://localhost:' + port);