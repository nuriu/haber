/// <reference path="../../typings/index.d.ts" />

import { Hurriyet } from "./hurriyet";

let fs = require("fs");
let istemci: Hurriyet;

$(document).ready(() => {
  zamaniYaz();

  fs.readFile("anahtar", "utf8", (hata: any, veri: any) => {
    if (hata) {
      return console.log(hata);
    } else {
      istemci = new Hurriyet(veri);
      istemci.sonElliHaberiAnasayfadaGoster();
    }
  });
});

function zamaniYaz() {
  setInterval(() => {
    let saniye = new Date().getSeconds();
    $("#saniye").html((saniye < 10 ? "0" : "") + saniye);
  }, 1000);

  setInterval(() => {
    let dakika = new Date().getMinutes();
    $("#dakika").html((dakika < 10 ? "0" : "") + dakika);
  }, 1000);

  setInterval(() => {
    let saat = new Date().getHours();
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
    "Aralık"
  ][new Date().getMonth()];

  document.getElementById("ay").innerHTML = ay;

  document.getElementById("yil").innerHTML = new Date().getUTCFullYear().toString();

}
