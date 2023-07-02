import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Select,
} from "@chakra-ui/react";
import "../styles/options.css";

interface MarketData {
  symbol: string;
  LTP: string;
  LTQ: string;
  totalTradedVolume: string;
  bestBid: string;
  bestAsk: string;
  bestBidQty: string;
  bestAskQty: string;
  openInterest: string;
  timestamp: string;
  sequence: string;
  prevClosePrice: string;
  prevOpenInterest: string;
  expiry_date: string;
  strike_price: string;
  change: string;
  IV: number;
}

const OptionChainComponent: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [selectedStrikePrice, setSelectedStrikePrice] = useState("");
  const [selectedExpiryDate, setSelectedExpiryDate] = useState("");

  useEffect(() => {
    // Sample JSON response data
    const responseData: MarketData[] = [
      {
        symbol: "MAINIDX",
        LTP: "1854880",
        LTQ: "0",
        totalTradedVolume: "0",
        bestBid: "0",
        bestAsk: "0",
        bestBidQty: "0",
        bestAskQty: "0",
        openInterest: "0",
        timestamp: "Sun Jul 02 13:24:58 IST 2023",
        sequence: "1",
        prevClosePrice: "1848775",
        prevOpenInterest: "0\n",
        expiry_date: "'",
        strike_price: "",
        change: "",
        IV: 1.99,
      },
      {
        "symbol": "FINANCI",
        "LTP": "1940360",
        "LTQ": "0",
        "totalTradedVolume": "0",
        "bestBid": "0",
        "bestAsk": "0",
        "bestBidQty": "0",
        "bestAskQty": "0",
        "openInterest": "0",
        "timestamp": "Sun Jul 02 13:24:58 IST 2023",
        "sequence": "2",
        "prevClosePrice": "1932270",
        "prevOpenInterest": "0\n",
        "expiry_date": "ALS'",
        "strike_price": "",
        "change": "",
        "IV": 1.99
      },
      {
        "symbol": "ALLBANK",
        "LTP": "4398250",
        "LTQ": "0",
        "totalTradedVolume": "0",
        "bestBid": "0",
        "bestAsk": "0",
        "bestBidQty": "0",
        "bestAskQty": "0",
        "openInterest": "0",
        "timestamp": "Sun Jul 02 13:24:58 IST 2023",
        "sequence": "3",
        "prevClosePrice": "4379020",
        "prevOpenInterest": "0\n",
        "expiry_date": "S'",
        "strike_price": "",
        "change": "",
        "IV": 1.99
      },
      // ... rest of the data
    ];

    setMarketData(responseData);
  }, []);

  const createDropdownOptions = (values: string[]): JSX.Element[] => {
    return values.map((value, index) => (
      <option key={index} value={value}>
        {value}
      </option>
    ));
  };

  const symbolOptions = createDropdownOptions(
    marketData.map((record) => record.symbol)
  );

  const expiryDateOptions = createDropdownOptions(
    marketData.map((record) => record.expiry_date)
  );

  const strikePriceOptions = createDropdownOptions(
    marketData.map((record) => record.strike_price)
  );

  const filteredData = marketData.filter((data) => {
    return (
      (!selectedSymbol || data.symbol === selectedSymbol) &&
      (!selectedStrikePrice || data.strike_price === selectedStrikePrice) &&
      (!selectedExpiryDate || data.expiry_date === selectedExpiryDate)
    );
  });

  return (
    <div className="filter-container">
      <h1>Option Chain</h1>
      <div>
        <label>Symbol:</label>
        <select
          value={selectedSymbol}
          onChange={(e) => setSelectedSymbol(e.target.value)}
        >
          <option value="">All</option>
          {symbolOptions}
        </select>
      </div>
      <div>
        <label>Expiry Date:</label>
        <select
          value={selectedExpiryDate}
          onChange={(e) => setSelectedExpiryDate(e.target.value)}
        >
          <option value="">All</option>
          {expiryDateOptions}
        </select>
      </div>
      <div>
        <label>Strike Price:</label>
        <select
          value={selectedStrikePrice}
          onChange={(e) => setSelectedStrikePrice(e.target.value)}
        >
          <option value="">All</option>
          {strikePriceOptions}
        </select>
      </div>
      <TableContainer>
        <Table size="sm" variant="simple" colorScheme="green">
          <Thead>
            <Tr style={{ backgroundColor: "#062d17" }}>
              <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                SYMBOL
              </Th>
              <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                CALLS
              </Th>
              <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                OI
              </Th>
              <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                CHNG IN OI
              </Th>
              <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                VOLUME
              </Th>
              <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                IV
              </Th>
              <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                LTP
              </Th>
              <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                CHNG
              </Th>
              <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                BID QTY
              </Th>
              <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                ASK
              </Th>
              <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                ASK QTY
              </Th>
              <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                STRIKE
              </Th>
              <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                BID QTY
              </Th>
              <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                BID
              </Th>
              <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                ASK
              </Th>
              <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                ASK QTY
              </Th>
              <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                CHNG
              </Th>
              <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                LTP
              </Th>
              <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                IV
              </Th>
              <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                VOLUME
              </Th>
              <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                CHNG IN OI
              </Th>
              <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                OI
              </Th>
              <Th className="table-head" style={{ color: "white", fontSize: "0.85rem" }}>
                CALLS
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map((data) => (
              <Tr key={data.symbol}>
                <Td>{data.symbol}</Td>
                <Td>{data.LTQ}</Td>
                <Td>{data.openInterest}</Td>
                <Td>{data.change}</Td>
                <Td>{data.totalTradedVolume}</Td>
                <Td>{data.IV}</Td>
                <Td>{data.LTP}</Td>
                <Td>{data.change}</Td>
                <Td>{data.bestBidQty}</Td>
                <Td>{data.bestAsk}</Td>
                <Td>{data.bestAskQty}</Td>
                <Td>{data.strike_price}</Td>
                <Td>{data.bestBidQty}</Td>
                <Td>{data.bestBid}</Td>
                <Td>{data.bestAsk}</Td>
                <Td>{data.bestAskQty}</Td>
                <Td>{data.change}</Td>
                <Td>{data.LTP}</Td>
                <Td>{data.IV}</Td>
                <Td>{data.totalTradedVolume}</Td>
                <Td>{data.change}</Td>
                <Td>{data.openInterest}</Td>
                <Td>{data.LTQ}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OptionChainComponent;
