/// <reference path="../../typings/index.d.ts" />

let fs = require('fs');
let http = require("https");
let anahtar: any;
let haberler: any;

$(document).ready(() => {
  zamaniYaz();

  fs.readFile("anahtar", "utf8", function (hata: any, veri: any) {
    if (hata) {
      return console.log(hata);
    } else {
      anahtar = veri;
      let options = {
        "method": "GET",
        "hostname": "api.hurriyet.com.tr",
        "port": null,
        "path": "/v1/articles",
        "headers": {
          "accept": "application/json",
          "apikey": anahtar,
        }
      };

      let req = http.request(options, function (res) {
        let chunks = [];

        res.on("data", function (chunk) {
          chunks.push(chunk);
        });

        res.on("end", function () {
          let body = Buffer.concat(chunks);
          haberler = jQuery.parseJSON(body.toString());
          console.log(haberler);
        });
      });
      req.end();
    }
  });
});


function zamaniYaz() {
  setInterval(function () {
    let saniye = new Date().getSeconds();
    $("#saniye").html((saniye < 10 ? "0" : "") + saniye);
  }, 1000);

  setInterval(function () {
    let dakika = new Date().getMinutes();
    $("#dakika").html((dakika < 10 ? "0" : "") + dakika);
  }, 1000);

  setInterval(function () {
    let saat = new Date().getHours();
    $("#saat").html((saat < 10 ? "0" : "") + saat);
  }, 1000);

  document.getElementById("gun").innerHTML = new Date().getDate().toString();

  let ay = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
  [new Date().getMonth()];
  document.getElementById("ay").innerHTML = ay;

  document.getElementById("yil").innerHTML = new Date().getUTCFullYear().toString();

}