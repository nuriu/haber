/// <reference path="../../typings/index.d.ts" />

let fs = require('fs');
let http = require("https");
let anahtar: any;

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
          let haberler = jQuery.parseJSON(body.toString());
          haberleriGoster(haberler);
        });
      });
      req.end();
    }
  });
});

function haberleriGoster(haberler: any) {
  console.log(haberler);

  let ifade: string = "<div class='ui four stackable special cards'>";
  for (let i = 0; i < haberler.length; i++) {
    let haber = haberler[i];
    ifade += "\
    <div class='fluid card'>\
      <div class='blurring dimmable image'>\
        <div class='ui dimmer'>\
          <div class='content'>\
            <div class='center'><div class='ui inverted button'>Haberi Oku</div></div>\
          </div>\
        </div>";
    if (haber.Files.length > 0) {
      if (haber.Files[0].FileUrl) {
        ifade += "<img src='" + haber.Files[0].FileUrl + "' />";
      }
    }
    ifade += "</div>\
      <div class='content'>\
        <a class='header haberBaslik'>" + haber.Title + "</a>\
        <div class='meta haberAciklama'>\
          <span class='date'><br>" + haber.Description + "</span>\
        </div>\
      </div>\
      <div class='extra content'><a class='haberTarih'><i class='calendar icon'></i>" + haber.ModifiedDate + "</a></div>\
    </div>";
  }
  ifade += "</div>";

  document.getElementById("haberler").innerHTML = ifade;

  $(".special.cards .image").dimmer({
    on: "hover",
  });
}

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

function zamanFormati(zaman: string): string {
  return zaman;
}