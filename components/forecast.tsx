export const Forecast = ({ currentData }: any) =>
  <div className="p-24 flex justify-center">
    <p>
      Forecast: {currentData?.timestamp}
    </p>
  </div>
