import React, { useEffect } from "react";

const PerSearchResultCard = ({ listing, id }) => {
  
  return (
    <>
      <div
        key={id}
        // sm:w-[200px] tablet:w-[200px] md:w-[400px] lg:w-[300px]
        className="w-[200px] tablet:w-[200px] md:w-[400px] lg:w-[250px] bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      >
        <img
          src={listing?.imageUrls[0].url}
          alt="property_pic"
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{listing?.name}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            {/* <MapPin size={16} className="mr-2" /> */}
            <span className="text-sm">{listing?.address}</span>
          </div>
          <p className="text-gray-500 text-sm mb-4">{listing?.description}</p>

          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <div className="flex items-center">
                {/* <Bed size={16} className="mr-1" /> */}
                <span>{listing?.bedrooms} Beds</span>
              </div>
              <div className="flex items-center">
                {/* <Bath size={16} className="mr-1" /> */}
                <span>{listing.bathrooms} Baths</span>
              </div>
            </div>
            <div className="flex items-center font-bold text-blue-600">
              {/* <DollarSign size={16} /> */}
              <span>{listing.regularPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PerSearchResultCard;
