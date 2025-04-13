import React, { useEffect, useState } from 'react';
import BarChart from '../components/BarChart';

const FavoritesChartPage = () => {
  const [favoriteCounts, setFavoriteCounts] = useState({});

  useEffect(() => {
    const storedFavoriteCounts = JSON.parse(localStorage.getItem("favoriteCounts"));
    if (storedFavoriteCounts) {
      setFavoriteCounts(storedFavoriteCounts);
    }
  }, []);

  const chartData = {
    labels: Object.keys(favoriteCounts),
    datasets: [
      {
        label: 'Added to Favorites',
        data: Object.values(favoriteCounts).map(count => count.added),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      { 	
        label: 'Removed from Favorites',
        data: Object.values(favoriteCounts).map(count => count.removed),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Favorites Interaction Chart',
      },
    },
  };

  return (
    <div className="favorites-chart-page">
      <h2>Favorites Interaction Chart</h2>
      {Object.keys(favoriteCounts).length > 0 ? (
        <BarChart data={chartData} options={chartOptions} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default FavoritesChartPage;
