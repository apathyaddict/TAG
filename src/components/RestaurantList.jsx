import React from "react";
import RestaurantCard from "./RestaurantCard"; // Assuming RestaurantCard component is in a separate file

const fakeRestaurantData = [
  {
    id: 1,
    name: "Le Petit Chef",
    rue: "123 Rue de la Cuisine",
    code_postal: "75001",
    ville: "Paris",
    website: "https://www.lepetitchef.com",
    days_open: "Monday - Saturday",
    menu: "French Cuisine",
    prices: "$$$",
    phone: "+33 1 2345 6789",
  },
  {
    id: 2,
    name: "La Pizzeria Bella",
    rue: "456 Rue de la Pizza",
    code_postal: "75002",
    ville: "Paris",
    website: "https://www.pizzeriabella.com",
    days_open: "Monday - Sunday",
    menu: "Italian Cuisine",
    prices: "$$",
    phone: "+33 1 9876 5432",
  },
  {
    id: 3,
    name: "Sushi Samba",
    rue: "789 Rue du Sushi",
    code_postal: "75003",
    ville: "Paris",
    website: "https://www.sushisamba.com",
    days_open: "Wednesday - Sunday",
    menu: "Japanese-Brazilian Fusion",
    prices: "$$$",
    phone: "+33 1 8765 4321",
  },
  // Add more restaurant data as needed
];

const FakeRestaurantList = () => {
  return (
    <div className="max-w-4xl mx-auto my-4 p-8">
      <h1 className="text-2xl font-bold mb-6 text-stone-600">
        Liste des Restaurants
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {fakeRestaurantData.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default FakeRestaurantList;
