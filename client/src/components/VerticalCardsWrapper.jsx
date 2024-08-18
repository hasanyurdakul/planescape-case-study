import React from "react";
import VerticalCardItem from "./VerticalCardItem";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import BeachAccessOutlinedIcon from "@mui/icons-material/BeachAccessOutlined";

// ######################################################################
// Maplenmek üzere oluşturulmuş olan cardData array'i.
// ######################################################################

var cardData = [
  {
    title: "Car Rentals",
    icon: <DirectionsCarFilledOutlinedIcon />,
    src: "https://img.freepik.com/free-photo/car-side-mirror-represents-reflection-safety-visual-extension_169016-57716.jpg?t=st=1723676501~exp=1723680101~hmac=6e8e9b20dd3972beebab04ff4c871b5422fd2f8ac83be7083d96276a33bff0dd&w=2000",
  },
  {
    title: "Hotels",
    icon: <ApartmentOutlinedIcon />,
    src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Travel Packages",
    icon: <BeachAccessOutlinedIcon />,
    src: "https://img.freepik.com/free-photo/arrangement-clothes-accessories-suitcase_23-2149064275.jpg?t=st=1723677272~exp=1723680872~hmac=7a0acc2131e3ab9e930e05895c7c602cfb3eb8864c0948879581311e1ab86adb&w=2000",
  },
];

// ######################################################################
// VerticalCardsWrapper componenti, VerticalCardItem componentlerini mapleyerek oluşturur. Masaüstü görünümde sağ tarafta bulunan 3 adet card alt alta sıralanır.
// ######################################################################

function VerticalCardsWrapper() {
  return (
    <div>
      {cardData.map((card, index) => (
        <VerticalCardItem
          key={index}
          title={card.title}
          icon={card.icon}
          src={card.src}
        />
      ))}
    </div>
  );
}

export default VerticalCardsWrapper;
