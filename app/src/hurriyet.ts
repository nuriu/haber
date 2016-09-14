const http = require("https");

export class Hurriyet {
    private anahtar: string;

    constructor(anahtar: string) {
        this.anahtar = anahtar;
    }

    public anahtariGetir(): string {
        return this.anahtar;
    }

    public haberDetayiniGoster(id: string) {
        let haber: any;
        let secenekler = {
            headers: {
                accept: "application/json",
                apikey: this.anahtar,
            },
            hostname: "api.hurriyet.com.tr",
            method: "GET",
            path: "/v1/articles/" + id,
            port: null,
        };

        let istek = http.request(secenekler, (cevap) => {
            let chunks = [];

            cevap.on("data", (chunk) => {
                chunks.push(chunk);
            });

            cevap.on("end", () => {
                let body = Buffer.concat(chunks);
                haber = jQuery.parseJSON(body.toString());
                this.haberDetayiniYazdir(haber);
            });
        });
        istek.end();
    }

    public yaziDetayiniGoster(id: string) {
        let yazi: any;
        let secenekler = {
            headers: {
                accept: "application/json",
                apikey: this.anahtar,
            },
            hostname: "api.hurriyet.com.tr",
            method: "GET",
            path: "/v1/columns/" + id,
            port: null,
        };

        let istek = http.request(secenekler, (cevap) => {
            let chunks = [];

            cevap.on("data", (chunk) => {
                chunks.push(chunk);
            });

            cevap.on("end", () => {
                let body = Buffer.concat(chunks);
                yazi = jQuery.parseJSON(body.toString());
                this.haberDetayiniYazdir(yazi);
            });
        });
        istek.end();
    }

    public sonElliHaberiAnasayfadaGoster() {
        let haberler: any;
        let secenekler = {
            headers: {
                accept: "application/json",
                apikey: this.anahtar,
            },
            hostname: "api.hurriyet.com.tr",
            method: "GET",
            path: "/v1/articles",
            port: null,
        };

        let istek = http.request(secenekler, (cevap) => {
            let chunks = [];

            cevap.on("data", (chunk) => {
                chunks.push(chunk);
            });

            cevap.on("end", () => {
                let body = Buffer.concat(chunks);
                haberler = jQuery.parseJSON(body.toString());
                this.haberleriYazdir(haberler);
            });
        });
        istek.end();
    }

    public sonElliKoseYazisiniAnasayfadaGoster() {
        let yazilar: any;
        let secenekler = {
            headers: {
                accept: "application/json",
                apikey: this.anahtar,
            },
            hostname: "api.hurriyet.com.tr",
            method: "GET",
            path: "/v1/columns",
            port: null,
        };

        let istek = http.request(secenekler, (cevap) => {
            let chunks = [];

            cevap.on("data", (chunk) => {
                chunks.push(chunk);
            });

            cevap.on("end", () => {
                let body = Buffer.concat(chunks);
                yazilar = jQuery.parseJSON(body.toString());
                this.yazilariYazdir(yazilar);
            });
        });

        istek.end();
    }

    private zamanFormati(zaman: string): string {
        let gun: string = "";
        let ay: string = "";
        let yil: string = "";
        let saat: string = "";

        for (let i = 0; i < zaman.length; i++) {
            if (zaman[i] !== "-" && zaman[i] !== "T") {
                if (i < 4) {
                    yil += zaman[i];
                } else if (i < 7) {
                    ay += zaman[i];
                } else if (i < 10) {
                    gun += zaman[i];
                } else if (i < 16) {
                    saat += zaman[i];
                }
            }
        }
        return (gun + "." + ay + "." + yil + " | " + saat);
    }

    private yazilariYazdir(yazilar: any) {
        let ifade: string = "<div class='ui special link cards'>";

        for (let i = 0; i < yazilar.length; i++) {
            let yazi = yazilar[i];

            if (yazi.Files.length > 0) {
                let aciklama: string = "";
                for (let j = 0; j < yazi.Description.length; j++) {
                    if (j > 96) {
                        aciklama += "...";
                        break;
                    } else {
                        aciklama += yazi.Description[j];
                    }
                }

                ifade += "<div class='ui fluid card'><div class='blurring dimmable image'>\
                        <div class='ui dimmer'><div class='content'>\
                            <div class='center'><div class='ui inverted button' id='" + yazi.Id + "'>Yazıyı Oku</div></div>\
                        </div></div>";

                if (yazi.Files[0].FileUrl) {
                    ifade += "<div class='koseYazisiFotografi'><img class='ui rounded image' src='" + yazi.Files[0].FileUrl + "' /></div>";
                }

                ifade += "</div>\
                    <div class='content'>\
                        <a class='header haberBaslik' id='baslik" + yazi.Id + "'>" + yazi.Title + "</a>\
                        <div class='meta haberAciklama'>\
                        <span class='date'><br>" + yazi.Description + "</span>\
                        </div>\
                    </div>\
                    <div class='extra content'><a class='haberTarih'>\
                        <i class='calendar icon'></i>" + this.zamanFormati(yazi.CreatedDate) + "\
                    </a></div>\
                </div>";

                setTimeout(() => {
                    document.getElementById("" + yazi.Id).addEventListener("click", () => {
                        this.yaziDetayiniGoster(yazi.Id);
                    });
                    document.getElementById("baslik" + yazi.Id).addEventListener("click", () => {
                        this.yaziDetayiniGoster(yazi.Id);
                    });
                }, 500);
            }
        }
        ifade += "</div>";

        document.getElementById("koseYazilari").innerHTML = ifade;

        $(".special.cards .image").dimmer({
            on: "hover",
        });
    }

    private haberleriYazdir(haberler: any) {
        let ifade: string = "<div class='ui special link cards'>";

        for (let i = 0; i < haberler.length; i++) {
            let haber = haberler[i];

            if (haber.Files.length > 0) {
                let aciklama: string = "";
                for (let j = 0; j < haber.Description.length; j++) {
                    if (j > 96) {
                        aciklama += "...";
                        break;
                    } else {
                        aciklama += haber.Description[j];
                    }
                }

                ifade += "<div class='card'><div class='blurring dimmable image'>\
                        <div class='ui dimmer'><div class='content'>\
                            <div class='center'><div class='ui inverted button' id='" + haber.Id + "'>Haberi Oku</div></div>\
                        </div></div>";

                if (haber.Files[0].FileUrl) {
                    ifade += "<div class='haberFotografi'><img class='ui rounded image' src='" + haber.Files[0].FileUrl + "' /></div>";
                }

                ifade += "</div>\
                    <div class='content'>\
                        <a class='header haberBaslik' id='baslik" + haber.Id + "'>" + haber.Title + "</a>\
                        <div class='meta haberAciklama'>\
                        <span class='date'><br>" + aciklama + "</span>\
                        </div>\
                    </div>\
                    <div class='extra content'><a class='haberTarih'>\
                        <i class='calendar icon'></i>" + this.zamanFormati(haber.ModifiedDate) + "\
                    </a></div>\
                </div>";

                setTimeout(() => {
                    document.getElementById("" + haber.Id).addEventListener("click", () => {
                        this.haberDetayiniGoster(haber.Id);
                    });
                    document.getElementById("baslik" + haber.Id).addEventListener("click", () => {
                        this.haberDetayiniGoster(haber.Id);
                    });
                }, 500);
            }
        }
        ifade += "</div>";

        document.getElementById("haberler").innerHTML = ifade;

        $(".special.cards .image").dimmer({
            on: "hover",
        });
    }

    private haberDetayiniYazdir(haber: any) {
        let ifade: string = "";
        ifade += "<i class='close icon'></i><div class='header'>" + haber.Title + "</div>";
        ifade += "<div class='content'><div class='ui grid'><div class='row'>";
        ifade += "<div class='sixteen wide column'>\
                        <img class='ui left floated image' src='" + haber.Files[0].FileUrl + "' />\
                        <p>" + haber.Text + "</p>\
                    </div>\
                </div>";

        document.getElementById("detayGorunumu").innerHTML = ifade;

        $(".long.modal").modal("show");
    }

    private yaziDetayiniYazdir(yazi: any) {
        let ifade: string = "";
        ifade += "<i class='close icon'></i><div class='header'>" + yazi.Title + "</div>";
        ifade += "<div class='content'><div class='ui grid'><div class='row'>";
        ifade += "<div class='sixteen wide column'>\
                        <img class='ui left floated image' src='" + yazi.Files[0].FileUrl + "' />\
                        <p>" + yazi.Text + "</p>\
                    </div>\
                </div>";

        document.getElementById("detayGorunumu").innerHTML = ifade;

        $(".long.modal").modal("show");
    }
}
