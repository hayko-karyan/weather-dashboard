export const CurrentWeather = ({ currentData }: any) =>
  <div className="p-24 flex justify-center">
    <p>
      City: {currentData?.city}
      Temperature: {currentData?.data?.temperature}
      Weather Conditions: {currentData?.data?.weatherConditions}
      humidity: {currentData?.data?.humidity}
      Wind Speed: {currentData?.data?.windSpeed}
    </p>
  </div>
