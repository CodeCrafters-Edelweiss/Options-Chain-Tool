import React, { useState, useEffect } from 'react';

interface OptionChainRecord {
  symbol: string;
  expiryDate: string;
  price: number;
  // Add other properties based on your requirement
}

const OptionChainComponent: React.FC = () => {
  const [optionChainData, setOptionChainData] = useState<OptionChainRecord[]>([]);
  const [filteredOptionChainData, setFilteredOptionChainData] = useState<OptionChainRecord[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');
  const [selectedExpiryDate, setSelectedExpiryDate] = useState<string>('');
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  const expiryDates: string[] = ['2023-07-01', '2023-07-02', '2023-07-03', '2023-07-04'];
  // Add other expiry dates based on your requirement

  const priceOptions: { label: string; value: number | null }[] = [
    { label: 'All', value: null },
    { label: 'Less than 50', value: 50 },
    { label: '50 to 100', value: 100 },
    { label: '100 to 150', value: 150 },
    // Add other price options as needed
  ];

  const fetchOptionChainData = async () => {
    try {
      const response = await fetch('https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY');
      const data = await response.json();

      const { records: optionChainRecords } = data['records']['data'];

      setOptionChainData(optionChainRecords);
    } catch (error) {
      console.error('Error fetching option chain data:', error);
    }
  };

  useEffect(() => {
    fetchOptionChainData();
  }, []);

  useEffect(() => {
    applyFilters(selectedSymbol, selectedExpiryDate, selectedPrice);
  }, [selectedSymbol, selectedExpiryDate, selectedPrice]);

  const applyFilters = (symbol: string, expiryDate: string, price: number | null) => {
    let filteredData = optionChainData;

    if (symbol) {
      filteredData = filteredData.filter((record) => record.symbol === symbol);
    }

    if (expiryDate) {
      filteredData = filteredData.filter((record) => record.expiryDate === expiryDate);
    }

    if (price !== null) {
      filteredData = filteredData.filter(
        (record) => record.price >= price && record.price <= price + 50
      );
    }

    setFilteredOptionChainData(filteredData);
  };

  return (
    <div>
      <h1>Option Chain</h1>
      <div>
        <label>Symbol:</label>
        <select value={selectedSymbol} onChange={(e) => setSelectedSymbol(e.target.value)}>
          <option value="">All</option>
          <option value="NIFTY">NIFTY</option>
          <option value="BANKNIFTY">BANKNIFTY</option>
          {/* <option value="">ALLBANKS</option>
          <option value="MAINIDX ">MAINIDX</option>
          <option value="FINANCIALS">FINANCIALS</option>
          <option value="MIDCAPS">MIDCAPS</option> */}
          {/* Add other symbols based on your requirement */}
        </select>
      </div>
      <div>
        <label>Expiry Date:</label>
        <select
          value={selectedExpiryDate}
          onChange={(e) => setSelectedExpiryDate(e.target.value)}
        >
          <option value="">All</option>
          {expiryDates.map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Price:</label>
        <select
          value={selectedPrice !== null ? selectedPrice.toString() : ''}
          onChange={(e) =>
            setSelectedPrice(e.target.value ? parseFloat(e.target.value) : null)
          }
        >
          {priceOptions.map((option, index) => (
            <option key={index} value={option.value?.toString()}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Expiry Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredOptionChainData.map((record, index) => (
            <tr key={index}>
              <td>{record.symbol}</td>
              <td>{record.expiryDate}</td>
              <td>{record.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OptionChainComponent;