import React from "react";

import { GrHost } from "react-icons/gr";

const EmptyState = ({ title, search }) => {
  return (
    <section className="flex-center size-full flex-col gap-3">
      <GrHost />
      <div className="flex-center w-full max-w-[254px] flex-col gap-3">
        <h1 className="text-16 text-center font-medium text-white-1">
          {title}
        </h1>
        {search && (
          <p className="text-16 text-center font-medium text-white-2">
            Il y a rien ici.
          </p>
        )}
      </div>
    </section>
  );
};

export default EmptyState;

{
  /* <EmptyState
title="No similar podcasts found"
buttonLink="/discover"
buttonText="Discover more podcasts"
/> */
}
