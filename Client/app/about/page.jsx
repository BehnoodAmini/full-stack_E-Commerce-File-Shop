"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import Loading from "../loading";

const azadiSquare = {
  lat: 35.6997,
  lng: 51.3377,
};

const MapComponent = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayerComponent = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const MarkerComponent = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const AboutPage = () => {
  const [customIcon, setCustomIcon] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then((L) => {
        const icon = new L.Icon({
          iconUrl: "/images/map-icons/location-icon.png",
          iconRetinaUrl: "/images/map-icons/location-icon.png",
          iconSize: [38, 38],
          iconAnchor: [19, 38],
          popupAnchor: [0, -38],
          shadowUrl: "/images/map-icons/marker-shadow.png",
          shadowSize: [50, 50],
          shadowAnchor: [19, 50],
        });
        setCustomIcon(icon);
      });
    }
  }, []);

  if (!customIcon) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <meta charSet="utf-8" />
        <title>درباره ما - فروشگاه فایل</title>
        <meta
          name="description"
          content="درباره فروشگاه فایل و موقعیت مکانی ما"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="درباره فروشگاه فایل, تماس با ما, آدرس, نقشه, میدان آزادی, OpenStreetMap"
        />
        <link rel="canonical" href="/about" />
      </div>

      <section className="container mx-auto p-12 flex flex-col items-center">
        <div className="px-8 py-4 rounded-md bg-indigo-600 text-white mb-8">
          درباره ما
        </div>

        <p className="text-center text-lg mb-8 max-w-2xl">
          به فروشگاه فایل ما خوش آمدید! ما در تلاشیم تا بهترین و جدیدترین
          فایل‌ها را در اختیار شما قرار دهیم. هدف ما ارائه محتوای با کیفیت و
          پشتیبانی عالی به کاربران عزیز است.
        </p>
        <div
          className="w-full max-w-4xl rounded-lg overflow-hidden shadow-lg"
          style={{ height: "400px", width: "100%" }}
        >
          <MapComponent
            center={azadiSquare}
            zoom={14}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayerComponent
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerComponent position={azadiSquare} icon={customIcon} />
          </MapComponent>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
