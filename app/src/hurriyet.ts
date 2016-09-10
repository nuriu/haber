let http = require("https");

export class Hurriyet {
    private anahtar: string;

    constructor(anahtar: string) {
        this.anahtar = anahtar;
    }

    public anahtariGetir(): string {
        return this.anahtar;
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
                this.anasayfayaYazdir(haberler);
            });
        });
        istek.end();
    }

    private haberDetayiniGoster(id: string) {
        console.log(id);
    }

    private anasayfayaYazdir(haberler: any) {
        let ifade: string = "<div class='ui five stackable special cards'>";
        for (let i = 0; i < haberler.length; i++) {
            let haber = haberler[i];
            ifade += "<div class='fluid card'><div class='blurring dimmable image'>\
                        <div class='ui dimmer'><div class='content'>\
                            <div class='center'><div class='ui inverted button' id='" + haber.Id + "'>Haberi Oku</div></div>\
                        </div></div>";
            if (haber.Files.length > 0) {
                if (haber.Files[0].FileUrl) {
                    ifade += "<img src='" + haber.Files[0].FileUrl + "' />";
                }
            }
            ifade += "</div>\
                    <div class='content'>\
                        <a class='header haberBaslik' id='baslik" + haber.Id + "'>" + haber.Title + "</a>\
                        <div class='meta haberAciklama'>\
                        <span class='date'><br>" + haber.Description + "</span>\
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
        ifade += "</div>";

        document.getElementById("haberler").innerHTML = ifade;

        $(".special.cards .image").dimmer({
            on: "hover",
        });
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

}