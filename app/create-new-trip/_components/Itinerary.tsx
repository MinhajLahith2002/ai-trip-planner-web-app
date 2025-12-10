'use client'

import React, { useEffect, useState } from 'react'
import { Timeline } from "@/components/ui/timeline";
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';
import { useTripDetail } from '@/app/provider';
import { TripInfo } from './ChatBox';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

// const TRIP_DATA = {
//   "destination": "Goa",
//   "duration": "3 days",
//   "origin": "Mumbai",
//   "budget": "Moderate",
//   "group_size": "1",
//   "hotels": [
//     {
//       "hotel_name": "Resort Rio",
//       "hotel_address": "Patto Plaza, Panaji, Goa 403001",
//       "price_per_night": "₹3500 - ₹4500",
//       "hotel_image_url": "https://images.unsplash.com/photo-1501117716987-c8efb8f473d1",
//       "geo_coordinates": {
//         "latitude": 15.4965,
//         "longitude": 73.8265
//       },
//       "rating": 4.2,
//       "description": "A vibrant resort offering easy access to adventure activities, swimming pool, and comfortable rooms situated in Panaji city."
//     },
//     {
//       "hotel_name": "The Park Baga River Goa",
//       "hotel_address": "Baga River, Punolem, Bardez, Goa 403518",
//       "price_per_night": "₹4000 - ₹5000",
//       "hotel_image_url": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
//       "geo_coordinates": {
//         "latitude": 15.6065,
//         "longitude": 73.7554
//       },
//       "rating": 4.5,
//       "description": "Located by the Baga River, offering serene views combined with proximity to water sports and adventure activities."
//     },
//     {
//       "hotel_name": "Lemon Tree Amarante Beach Resort Goa",
//       "hotel_address": "Amarante Beach Rd, Calangute, Goa 403516",
//       "price_per_night": "₹4500 - ₹5500",
//       "hotel_image_url": "https://images.unsplash.com/photo-1494526585095-c41746248156",
//       "geo_coordinates": {
//         "latitude": 15.5818,
//         "longitude": 73.7543
//       },
//       "rating": 4.3,
//       "description": "A beachside resort ideal for adventure seekers with access to water sports and close to Calangute Beach."
//     }
//   ],
//   "itinerary": [
//     {
//       "day": 1,
//       "day_plan": "Arrival in Goa and exploring North Goa adventure spots",
//       "best_time_to_visit_day": "Morning to Evening",
//       "activities": [
//         {
//           "place_name": "Dudhsagar Waterfalls",
//           "place_details": "One of India's tallest waterfalls, perfect for trekking and adventurous swims.",
//           "place_image_url": "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
//           "geo_coordinates": {
//             "latitude": 15.3142,
//             "longitude": 74.3034
//           },
//           "place_address": "Mollem, Goa",
//           "ticket_pricing": "₹50 entry fee",
//           "time_travel_each_location": "Approx 2.5 hours from Panaji",
//           "best_time_to_visit": "Early morning to avoid crowds and for a better trekking experience"
//         },
//         {
//           "place_name": "Trekking in Bhagwan Mahavir Wildlife Sanctuary",
//           "place_details": "Explore jungle trails, wildlife and natural beauty in Goa's largest wildlife sanctuary.",
//           "place_image_url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
//           "geo_coordinates": {
//             "latitude": 15.3172,
//             "longitude": 74.2723
//           },
//           "place_address": "Mollem, Goa",
//           "ticket_pricing": "₹100 entry fee",
//           "time_travel_each_location": "Near Dudhsagar Waterfalls, combine visit with waterfall trek",
//           "best_time_to_visit": "Morning to afternoon"
//         }
//       ]
//     },
//     {
//       "day": 2,
//       "day_plan": "Water sports and adventure in Calangute and Baga beach",
//       "best_time_to_visit_day": "Morning to late afternoon",
//       "activities": [
//         {
//           "place_name": "Calangute Beach",
//           "place_details": "Popular beach for various adventure water sports including parasailing, jet skiing, and windsurfing.",
//           "place_image_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
//           "geo_coordinates": {
//             "latitude": 15.577,
//             "longitude": 73.7554
//           },
//           "place_address": "Calangute, North Goa",
//           "ticket_pricing": "Water sports prices vary from ₹500 to ₹2000 per activity",
//           "time_travel_each_location": "30 min from Panaji",
//           "best_time_to_visit": "8 AM to 4 PM to avoid afternoon rush and heat"
//         },
//         {
//           "place_name": "Baga Beach",
//           "place_details": "Another hotspot for water adventures, night parties and beach shacks offering local cuisine.",
//           "place_image_url": "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
//           "geo_coordinates": {
//             "latitude": 15.609,
//             "longitude": 73.7556
//           },
//           "place_address": "Baga, North Goa",
//           "ticket_pricing": "Water sports and parasailing: ₹600 to ₹2500",
//           "time_travel_each_location": "10 mins from Calangute",
//           "best_time_to_visit": "Late afternoon to enjoy sunset and night activities"
//         }
//       ]
//     },
//     {
//       "day": 3,
//       "day_plan": "Explore South Goa for relaxed adventure and nature",
//       "best_time_to_visit_day": "Morning to evening",
//       "activities": [
//         {
//           "place_name": "Palolem Beach Kayaking",
//           "place_details": "Kayaking in the calm waters surrounded by beautiful cliffs and beaches.",
//           "place_image_url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
//           "geo_coordinates": {
//             "latitude": 15.0114,
//             "longitude": 74.0294
//           },
//           "place_address": "Palolem, South Goa",
//           "ticket_pricing": "Kayaking approx ₹500 per hour",
//           "time_travel_each_location": "2 hours from Panaji",
//           "best_time_to_visit": "Early morning or late afternoon"
//         },
//         {
//           "place_name": "Dolphin Watching at Sinquerim Beach",
//           "place_details": "Boat rides to watch dolphins in their natural habitat, an adventurous marine experience.",
//           "place_image_url": "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
//           "geo_coordinates": {
//             "latitude": 15.5802,
//             "longitude": 73.8101
//           },
//           "place_address": "Sinquerim, North Goa",
//           "ticket_pricing": "Boat ride approx ₹700 per person",
//           "time_travel_each_location": "30 mins from Panaji",
//           "best_time_to_visit": "Morning for calm sea and better dolphin sightings"
//         }
//       ]
//     }
//   ]
// }


function Itinerary() {
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
  const [tripData, setTripData] = useState<TripInfo | null>(null);

  useEffect(() => {
    tripDetailInfo && setTripData(tripDetailInfo)
  }, [tripDetailInfo])


  const data = tripData ? [
    {
      title: "Hotels",
      content: (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {tripData?.hotels.map((hotel, index) => (
            <HotelCardItem key={index} hotel={hotel} />
          ))}
        </div>
      ),
    },
    ...tripData?.itinerary.map((dayData) => ({
      title: `Day ${dayData?.day}`,
      content: (
        <div>
          <p>Best Time:{dayData?.best_time_to_visit_day}</p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {dayData?.activities.map((activity, index) => (
              <PlaceCardItem activity={activity} />
            ))}
          </div>
        </div>
      )
    }))

  ] : [];
  return (
    <div className="relative w-full h-[83vh] overflow-auto">
      {tripData ? <Timeline data={data} tripData={tripData} />
        :
        <div>

          <h2 className='flex gap-2 text-3xl text-white left-20 items-center absolute bottom-20'> <ArrowLeft/> Getting to know you to build perfect trip here...</h2>

          <Image src={'/travel.png'} alt='travel' width={800} height={800}
            className='w-full h-full object-cover rounded-3xl'
          />
        </div>
      }
    </div>
  );
}

export default Itinerary


