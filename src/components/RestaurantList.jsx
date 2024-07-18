import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard"; //
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RestaurantList = ({ restaurants, setIsEditing, setIsnew, editFunc }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (restaurants && restaurants.length > 0) {
      setLoading(false);
    }
  }, [restaurants]);

  if (loading) {
    return (
      <div className="max-w-full mr-10 p-10">
        <Skeleton height={10} className="my-2" count={6} />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-4 w-full overflow-x-hidden justify-start mx-auto align-left  px-4">
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          {...{ setIsEditing, setIsnew, editFunc }}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
