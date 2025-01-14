import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchWeather } from "../store/slices/todoSlice";

const cityOptions = [
  { value: "London", label: "London" },
  { value: "New Delhi", label: "New Delhi" },
  { value: "New York", label: "New York" },
  { value: "Tokyo", label: "Tokyo" },
  { value: "Paris", label: "Paris" },
  { value: "Sydney", label: "Sydney" },
  { value: "Berlin", label: "Berlin" },
  { value: "Dubai", label: "Dubai" },
  { value: "Los Angeles", label: "Los Angeles" },
  { value: "Madrid", label: "Madrid" },
  { value: "Rome", label: "Rome" },
  { value: "Istanbul", label: "Istanbul" },
  { value: "Cape Town", label: "Cape Town" },
  { value: "Cairo", label: "Cairo" },
  { value: "Bangkok", label: "Bangkok" },
  { value: "Seoul", label: "Seoul" },
  { value: "Singapore", label: "Singapore" },
  { value: "Moscow", label: "Moscow" },
  { value: "Toronto", label: "Toronto" },
  { value: "Rio de Janeiro", label: "Rio de Janeiro" },
  { value: "Barcelona", label: "Barcelona" },
  { value: "Lagos", label: "Lagos" },
  { value: "Jakarta", label: "Jakarta" },
  { value: "Mumbai", label: "Mumbai" },
  { value: "Buenos Aires", label: "Buenos Aires" },
  { value: "Mexico City", label: "Mexico City" },
  { value: "Shanghai", label: "Shanghai" },
  { value: "Hong Kong", label: "Hong Kong" },
  { value: "Kuala Lumpur", label: "Kuala Lumpur" },
  { value: "Bengaluru", label: "Bengaluru" },
  { value: "Chennai", label: "Chennai" },
  { value: "Kolkata", label: "Kolkata" },
  { value: "Hyderabad", label: "Hyderabad" },
  { value: "Pune", label: "Pune" },
  { value: "Ahmedabad", label: "Ahmedabad" },
  { value: "Jaipur", label: "Jaipur" },
  { value: "Lucknow", label: "Lucknow" },
  { value: "Chandigarh", label: "Chandigarh" },
  { value: "Indore", label: "Indore" },
  { value: "Surat", label: "Surat" },
  { value: "Nagpur", label: "Nagpur" },
  { value: "Patna", label: "Patna" },
  { value: "Vadodara", label: "Vadodara" },
  { value: "Kochi", label: "Kochi" },
  { value: "Visakhapatnam", label: "Visakhapatnam" },
  { value: "Bhopal", label: "Bhopal" },
  { value: "Vijayawada", label: "Vijayawada" },
  { value: "Guwahati", label: "Guwahati" },
  { value: "Agra", label: "Agra" },
  { value: "Varanasi", label: "Varanasi" }
];

const WeatherWidget = () => {
  const dispatch = useDispatch();
  const { weather, status, error } = useSelector((state) => state.todos);
  const [selectedCity, setSelectedCity] = useState({ value: "New Delhi", label: "New Delhi" });

  useEffect(() => {
    if (selectedCity.value) {
      dispatch(fetchWeather(selectedCity.value));
    }
  }, [selectedCity, dispatch]);

  if (status === "loading") return <div>Loading weather...</div>;
  if (status === "failed") return <div>Error: {error}</div>;
  if (!weather) return null;

  const currentWeather = weather.current_condition[0];
  const temperature = currentWeather.temp_C; // Celsius
  const description = currentWeather.weatherDesc[0].value; // Description

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      {/* Advanced Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-600 font-semibold mb-2">
          Select City:
        </label>
        <Select
          options={cityOptions}
          value={selectedCity}
          onChange={(option) => setSelectedCity(option)}
          placeholder="Select a city..."
          className="w-full"
        />
      </div>

      {/* Weather Information */}
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-semibold mb-2">{selectedCity.label}</h3>
        <p className="text-3xl font-bold">{temperature}°C</p>
        <p className="text-lg text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default WeatherWidget;
