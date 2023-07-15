import { LocalBusinessJsonLd } from "next-seo";

export default function LocalBusinessSeo(): JSX.Element {
  return (
    <LocalBusinessJsonLd
      type="Electrician"
      id="http://www.s-control.net"
      name="S-control | Instalacje Fotowoltaiczne"
      description="Instalacje fotowoltaiczne, pompy ciepła, klimatyzacje oraz magazyny energii. Działamy głównie na terenie województw podkarpackiego i małopolskiego, obsługując miasta takie jak Krosno, Rzeszów, Kraków, Tarnów oraz inne miejscowości w regionie."
      url="http://www.s-control.net"
      telephone="+48 730 530 556"
      address={{
        streetAddress: "Żarnowiec 119",
        addressLocality: "Jedlicze",
        addressRegion: "Podkarpacie",
        postalCode: "38460",
        addressCountry: "PL",
      }}
      geo={{
        latitude: "49.694072506808396",
        longitude: "21.663038350936905",
      }}
      images={["https://www.s-control.net/img/openGraph/main4.webp"]}
      openingHours={[
        {
          opens: "08:00",
          closes: "18:00",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        },
      ]}
      areaServed={[
        {
          //Jedlicze
          geoMidpoint: {
            latitude: "49.694072506808396",
            longitude: "21.663038350936905",
          },
          geoRadius: "100000",
        },
        {
          //Lesko
          geoMidpoint: {
            latitude: "49.46944294617335",
            longitude: "22.323918540623364",
          },
          geoRadius: "100000",
        },
        {
          //Rzeszów
          geoMidpoint: {
            latitude: "50.03908384785711",
            longitude: "21.997127531164853",
          },
          geoRadius: "100000",
        },
        {
          //Tarnów
          geoMidpoint: {
            latitude: "50.01135500274417",
            longitude: "20.995173958657933",
          },
          geoRadius: "100000",
        },
        {
          //Nowy Sącz
          geoMidpoint: {
            latitude: "49.62346619315146",
            longitude: "20.71770989198993",
          },
          geoRadius: "100000",
        },
        {
          //Kraków
          geoMidpoint: {
            latitude: "50.06283869452441",
            longitude: "19.943893444373455",
          },
          geoRadius: "100000",
        },
      ]}
    />
  );
}
