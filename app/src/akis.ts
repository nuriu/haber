/// <reference path="../../typings/index.d.ts" />

import { Hurriyet } from "./hurriyet";

const fs = require("fs");
let istemci: Hurriyet;

$(document).ready(() => {
  zamaniYaz();

  fs.readFile("anahtar", "utf8", (hata: any, veri: any) => {
    if (hata) {
      return console.log(hata);
    } else {
      veri = veri.replace(/(\r\n|\n|\r)/gm,"");//remove line feed
      istemci = new Hurriyet(veri);
      console.log(istemci);
      istemci.sonElliHaberiAnasayfadaGoster(5);
      istemci.sonElliKoseYazisiniAnasayfadaGoster(3);
    }
  });
});

function zamaniYaz() {
  setInterval(() => {
    let saniye = new Date().getSeconds();
    let dakika = new Date().getMinutes();
    let saat = new Date().getHours();

    $("#saniye").html((saniye < 10 ? "0" : "") + saniye);
    $("#dakika").html((dakika < 10 ? "0" : "") + dakika);
    $("#saat").html((saat < 10 ? "0" : "") + saat);
  }, 1000);


  document.getElementById("gun").innerHTML = new Date().getDate().toString();

  let ay = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ][new Date().getMonth()];

  document.getElementById("ay").innerHTML = ay;

  document.getElementById("yil").innerHTML = new Date().getUTCFullYear().toString();
}
