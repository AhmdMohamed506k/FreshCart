import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import FreshCartLoader from '../Loading/Loader/Loader';
import BrandsSlider from './BrandsSlider';

export default function Brands() {

    async function GetBrands() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    }

    const { isLoading, data } = useQuery({
        queryKey: ["BrandId"],
        queryFn: GetBrands,
    });

    const Brands = data?.data?.data || [];
    console.log(Brands);


    if (isLoading) {
        return (
            <FreshCartLoader />
        );
    }

    return (
        <>
            <head>
                <meta charSet="utf-8" />
                <title>Brands</title>

            </head>




            {/* 🔹 Horizontal Scroll Row */}

            <BrandsSlider />

            {/* 🔹 Responsive Grid */}
            <div className="w-[90%] m-auto py-10">
                <div className="   grid    grid-cols-1    md:grid-cols-2    lg:grid-cols-3    xl:grid-cols-4    gap-10 " >
                    {Brands.map((brand) => (
                        <div key={brand._id} className="flex flex-col items-center text-center cursor-pointer border-2 rounded-2xl border-gray-200" >
                            <img src={brand.image} alt={brand.name} className="w-20 h-40 object-contain mx-auto mb-4" />

                            <p className="text-gray-800 text-sm font-medium leading-tight mb-2">
                                {brand.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
