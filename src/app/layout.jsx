"use client";
import { Inter, Montserrat } from "next/font/google";
import Provider from "./Provider";
import "./globals.css";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { UserLocationContext } from "/context/UserLocationContext";
import { SelectedItemContext } from "../../context/SelectedItemContext";
import { latLng2Tile } from "google-map-react";
const inter = Inter({ subsets: ["latin"] });

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

/*export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}; */

export default function RootLayout({ children }) {
  const [userLocation, setUserLocation] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      //console.log(pos);
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };

  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Provider>
          <SelectedItemContext.Provider
            value={{ selectedItem, setSelectedItem }}
          >
            <UserLocationContext.Provider
              value={{ userLocation, setUserLocation }}
            >
              <Navbar />
              {children}
            </UserLocationContext.Provider>
          </SelectedItemContext.Provider>
        </Provider>
      </body>
    </html>
  );
}
