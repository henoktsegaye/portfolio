import React, { FC } from "react";

type propTypes = {
  name: string;
  title: string;
  image: string;
  location: string;
  testimonial: string;
};

const TestimonialCard: FC<propTypes> = ({
  name,
  title,
  image,
  location,
  testimonial,
}) => {
  return (
    <div className="border mt-12 flex flex-col flex-nowrap py-2 px-6 dark:bg-gray-900 bg-blue-50 rounded-xl  border-gray-200 dark:border-gray-900">
      <div className="flex flex-row justify-between items-center">
        <img
          className="w-32 h-auto mh-32 border-4 dark:border-gray-900 border-gray-300 rounded-full mb-4 -mt-12 "
          src={image}
          alt={name}
        />
        <div className="flex flex-col">
          <h3 className="text-2xl dark:text-white font-semibold">{name}</h3>
          <p className="text-sm dark:text-gray-400 text-gray-600">{title}</p>
        </div>
      </div>
      <div>
        <p className="text-gray-900 dark:text-gray-300">
          {testimonial}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 my-4">
          {location} -
          Jan 23, 2022
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
