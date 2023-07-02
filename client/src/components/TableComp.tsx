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

const TableComp = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]); // State to store market data

  useEffect(() => {
    // Sample JSON response data
    const responseData = [
      {
        "symbol": "MAINIDX",
        "LTP": "1854880",
        "LTQ": "0",
        "totalTradedVolume": "0",
        "bestBid": "0",
        "bestAsk": "0",
        "bestBidQty": "0",
        "bestAskQty": "0",
        "openInterest": "0",
        "timestamp": "Sun Jul 02 13:24:58 IST 2023",
        "sequence": "1",
        "prevClosePrice": "1848775",
        "prevOpenInterest": "0\n",
        "expiry_date": "'",
        "strike_price": "",
        "change": "",
        "IV": 1.99
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
      {
        "symbol": "MIDCAPS",
        "LTP": "785650",
        "LTQ": "0",
        "totalTradedVolume": "0",
        "bestBid": "0",
        "bestAsk": "0",
        "bestBidQty": "0",
        "bestAskQty": "0",
        "openInterest": "0",
        "timestamp": "Sun Jul 02 13:24:58 IST 2023",
        "sequence": "4",
        "prevClosePrice": "759205",
        "prevOpenInterest": "0\n",
        "expiry_date": "'",
        "strike_price": "",
        "change": "",
        "IV": 1.99
      }
    ]
    

    setMarketData(responseData);

    /*  const socket = io("http://localhost:5000"); // Replace with your server URL

    // Event listener for receiving data from the server
    socket.on("marketData", (data: MarketData[]) => {
      setMarketData(data);
    });

    return () => {
      socket.disconnect(); // Clean up the socket connection when component unmounts
    }; */
  }, []);

  return (
    <>
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
            {marketData.map((data) => (
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
    </>
  );
};

export default TableComp;
