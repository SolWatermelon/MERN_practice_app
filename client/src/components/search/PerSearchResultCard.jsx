import React from "react";

const PerSearchResultCard = () => {
  const properties = [
    {
      id: 1,
      title: "Modern Penthouse in the Cliff",
      location: "785 Serene Shore Road, Willow Lake",
      description:
        "Indulge in the luxury of coastal living in this elegant beachfront villa. With direct priva...",
      price: 3400,
      beds: 4,
      baths: 5,
      image: "/api/placeholder/400/300",
    },
    {
      id: 2,
      title: "Ultra-Modern Penthouse",
      location: "456 Serenity Lane, Meadowville",
      description:
        "Elevate your living experience with this state-of-the-art penthouse with futuristic desig...",
      price: 500,
      beds: 6,
      baths: 5,
      image: "/api/placeholder/400/300",
    },
    {
      id: 3,
      title: "Modern Loft with Stunning Views",
      location: "101 Serene Shore Road, Willow Lake",
      description:
        "Indulge in the luxury of coastal living in this elegant beachfront villa. With direct priva...",
      price: 1200,
      beds: 3,
      baths: 5,
      image: "/api/placeholder/400/300",
    },
    {
      id: 1,
      title: "Modern Penthouse in the Cliff",
      location: "785 Serene Shore Road, Willow Lake",
      description:
        "Indulge in the luxury of coastal living in this elegant beachfront villa. With direct priva...",
      price: 3400,
      beds: 4,
      baths: 5,
      image: "/api/placeholder/400/300",
    },
    {
      id: 2,
      title: "Ultra-Modern Penthouse",
      location: "456 Serenity Lane, Meadowville",
      description:
        "Elevate your living experience with this state-of-the-art penthouse with futuristic desig...",
      price: 500,
      beds: 6,
      baths: 5,
      image: "/api/placeholder/400/300",
    },
    {
      id: 3,
      title: "Modern Loft with Stunning Views",
      location: "101 Serene Shore Road, Willow Lake",
      description:
        "Indulge in the luxury of coastal living in this elegant beachfront villa. With direct priva...",
      price: 1200,
      beds: 3,
      baths: 5,
      image: "/api/placeholder/400/300",
    },
  ];

  return (
    <div>
      <div className=" text-[20px] md:text-[40px] font-extrabold text-white">
        <span>所有房屋</span>
      </div>
      <div className="flex flex-wrap gap-3 justify-center xl:border-l-8 border-white border-white border-t-8 p-8">
        {properties.map((property, i) => (
          <div
            key={i}
            className="xl:max-w-[250px] bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
              <div className="flex items-center text-gray-600 mb-2">
                {/* <MapPin size={16} className="mr-2" /> */}
                <span className="text-sm">{property.location}</span>
              </div>
              <p className="text-gray-500 text-sm mb-4">
                {property.description}
              </p>

              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    {/* <Bed size={16} className="mr-1" /> */}
                    <span>{property.beds} Beds</span>
                  </div>
                  <div className="flex items-center">
                    {/* <Bath size={16} className="mr-1" /> */}
                    <span>{property.baths} Baths</span>
                  </div>
                </div>
                <div className="flex items-center font-bold text-blue-600">
                  {/* <DollarSign size={16} /> */}
                  <span>{property.price}/month</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerSearchResultCard;
