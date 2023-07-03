
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
    SimpleGrid,
    Box,
    Button,
} from "@chakra-ui/react";
import { Center, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import "../styles/options.css";
import TableHead from "./TableHead";
import { io } from 'socket.io-client';
import { useNavigate } from "react-router-dom";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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

const socket = io('http://localhost:5000'); 

const TableComp = () => {// State to store market data
  const [selectedSymbol, setSelectedSymbol] = useState<string>(""); // State to store selected symbol
  const [selectedStrikePrice, setSelectedStrikePrice] = useState<string>(""); // State to store selected strike price
  const [selectedExpiryDate, setSelectedExpiryDate] = useState<string>(""); // State to store selected expiry date
  const [symbols,setSymbols] = useState<string[]>([]);
  const [strikePrices,setStrikePrices] = useState<string[]>([]);
  const [expiryDates,setExpiryDates] = useState<string[]>([]);
  const [responseData, setResponseData] = useState<MarketData[]>([]);

  const navigate = useNavigate(); 
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    socket.on('from-server', (msg) => {
      console.log(msg);
    });
  
    socket.on('market_data', (msg)=>{
      // console.log(msg);
      const response = JSON.parse(msg)[2];
      console.log(response)
      response.
      setResponseData(response);
    })
    socket.emit('update_market_data')
  }, []);

/*   const responseData = [
      {
      "symbol": "MAINIDX",
      "LTP": "1595",
      "LTQ": "0",
      "totalTradedVolume": "0",
      "bestBid": "0",
      "bestAsk": "0",
      "bestBidQty": "0",
      "bestAskQty": "0",
      "openInterest": "0",
      "timestamp": "Mon Jul 03 21:01:14 IST 2023",
      "sequence": "8",
      "prevClosePrice": "0",
      "prevOpenInterest": "0",
      "change": "PE",
      "expiry_date": "31AUG23",
      "strike_price": "16650",
      "IV": 1.99
    }
    {
      "symbol": "FINANCIALS",
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
      "expiry_date": "23AUG23",
      "strike_price": "170",
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
      "expiry_date": "20AUG23",
      "strike_price": "190",
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
      "expiry_date": "13JUL23",
      "strike_price": "12",
      "change": "",
      "IV": 1.99
    }
  ] */

  const options = {
    title: {
      text: 'Nifty',
      align: 'left'
    },
    subtitle: {
      text: 'By Job Category. Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>.',
      align: 'left'
    },
    yAxis: {
      title: {
        text: 'Number of Employees'
      }
    },
    xAxis: {
      accessibility: {
        rangeDescription: 'Range: 2010 to 2020'
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },
    series: [
      {
        name: 'Installation & Developers',
        data: [
          43934,
          48656,
          65165,
          81827,
          112143,
          142383,
          171533,
          165174,
          155157,
          161454,
          154610
        ]
      },
      {
        name: 'Manufacturing',
        data: [
          24916,
          37941,
          29742,
          29851,
          32490,
          30282,
          38121,
          36885,
          33726,
          34243,
          31050
        ]
      },
      {
        name: 'Sales & Distribution',
        data: [
          11744,
          30000,
          16005,
          19771,
          20185,
          24377,
          32147,
          30912,
          29243,
          29213,
          25663
        ]
      },
      {
        name: 'Operations & Maintenance',
        data: [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          11164,
          11218,
          10077
        ]
      },
      {
        name: 'Other',
        data: [
          21908,
          5548,
          8105,
          11248,
          8989,
          11816,
          18274,
          17300,
          13053,
          11906,
          10073
        ]
      }
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }
      ]
    }
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };



  // Filter the market data based on selected symbol, strike price, and expiry date
  const filteredData = responseData.filter((data) => {
    let returnValue;
        (!selectedSymbol || data.symbol === selectedSymbol) &&
        (!selectedStrikePrice || data.strike_price === selectedStrikePrice) &&
        (!selectedExpiryDate || data.expiry_date === selectedExpiryDate)
          ? (returnValue = true)
          : (returnValue = false);
        return returnValue;
  });

  const notInArray = (array: string[], value: string) => {
    let notInArray = true;
    for(let i = 0; i < array.length; i++) {
        if(value === array[i]){
          notInArray = false;
        }
    }
    return notInArray;
  }

  const settingValues = () => {
    filteredData.map((data)=>{
      notInArray(symbols,data.symbol) && setSymbols((prev: string[]) => {
        return [...prev,data.symbol]
      });
      notInArray(strikePrices,data.strike_price) && setStrikePrices((prev: string[]) => {
        return [...prev, data.strike_price]
      });
      notInArray(expiryDates,data.expiry_date) && setExpiryDates((prev: string[]) => {
        return [...prev, data.expiry_date]
      });
    });
  }

  useEffect(() => {
  filteredData && settingValues();
  }, [filteredData]);



  console.log(`symbols: ${symbols} | strikeprices: ${strikePrices} | expiryDates: ${expiryDates}`);
  // const symbols = [...new Set(filteredData.map((data) => data.symbol))];
  // const strikePrices = [...new Set(filteredData.map((data) => data.strike_price))];
  // const expiryDates = [...new Set(filteredData.map((data) => data.expiry_date))];

  return (
      <>
        <div className="filter-container" style={{paddingBottom:"20px",zIndex:"10000"}}>
          <SimpleGrid columns={3}>
            <Box maxW='sm'>

          <Select
              placeholder="Select Symbol"
              value={selectedSymbol}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSymbol(e.target.value)}
          >
            <option value="">All</option>
            {symbols.map((symbol) => (
                <option key={symbol} value={symbol}>
                  {symbol}
                </option>
            ))}
          </Select>
            </Box>
            <Box maxW='sm'>

          <Select
              placeholder="Select Strike Price"
              value={selectedStrikePrice}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedStrikePrice(e.target.value)}
          >
            <option value="">All</option>
            {strikePrices.map((strikePrice) => (
                <option key={strikePrice} value={strikePrice}>
                  {strikePrice}
                </option>
            ))}
          </Select>
            </Box>
            <Box maxW='sm'>

          <Select
              placeholder="Select Expiry Date"
              value={selectedExpiryDate}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedExpiryDate(e.target.value)}
          >
            <option value="">All</option>
            {expiryDates.map((expiryDate) => (
                <option key={expiryDate} value={expiryDate}>
                  {expiryDate}
                </option>
            ))}
          </Select>
            </Box>
          </SimpleGrid>
        </div>
        <TableContainer>
          <Table size="sm" variant="simple" colorScheme="green">
            <TableHead/>
            <Tbody>
              {filteredData.map((data) => (
                  <Tr key={data.symbol}>
                    <Td><Button onClick={handleOpenModal}>Open Chart</Button>

                    <Modal isOpen={isOpen} onClose={handleCloseModal} size="xl">
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>
                          <Heading as="h1" size="lg" color="black">
                            Chart
                          </Heading>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <Box width="100%" height="400px">
                            <HighchartsReact highcharts={Highcharts} options={options} />
                          </Box>
                        </ModalBody>
                        <ModalFooter>
                          <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
                            Close
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal></Td>
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

/* import React, { useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:50000'); // Use http:// instead of ws://

const TestComponent = () => {
  const [serverMessage, setServerMessage] = useState(null);

  socket.on('from-server', (msg) => {
    console.log(msg);
    // setServerMessage(msg);
  });

  console.log('before')
  socket.emit('to-server', 'hello')

  console.log('sent')
  return (
    <div>
      <h2>Market Data Updates</h2>
      <ul>
        <li>{serverMessage}</li>
      </ul>
    </div>
  );
}

export default TestComponent;
 */