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
        streetAddress: "Żaronowiec 119",
        addressLocality: "Jedlicze",
        addressRegion: "Podkarpacie",
        postalCode: "38460",
        addressCountry: "PL",
      }}
      geo={{
        latitude: "49.6931626",
        longitude: "21.6591809",
      }}
      images={[
        "https://example.com/photos/1x1/photo.jpg",
        "https://example.com/photos/4x3/photo.jpg",
        "https://example.com/photos/16x9/photo.jpg",
      ]}
      openingHours={[
        {
          opens: "08:00",
          closes: "18:00",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        },
      ]}
      areaServed={[
        {
          geoMidpoint: {
            latitude: "49.6931626",
            longitude: "21.6591809",
          },
          geoRadius: "200000",
        },
      ]}
    />
  );
}
