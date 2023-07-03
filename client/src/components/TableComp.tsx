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
import { useNavigate } from "react-router-dom";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const TableComp = () => {// State to store market data
  const [selectedSymbol, setSelectedSymbol] = useState(""); // State to store selected symbol
  const [selectedStrikePrice, setSelectedStrikePrice] = useState(""); // State to store selected strike price
  const [selectedExpiryDate, setSelectedExpiryDate] = useState(""); // State to store selected expiry date
  const [symbols,setSymbols] = useState<string[]>([]);
  const [strikePrices,setStrikePrices] = useState<string[]>([]);
  const [expiryDates,setExpiryDates] = useState<string[]>([]);
  const navigate = useNavigate(); 
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Sample JSON response data
    /*  const socket = io("http://localhost:5000"); // Replace with your server URL
    // Event listener for receiving data from the server
    socket.on("marketData", (data: MarketData[]) => {
      setMarketData(data);
    });

    return () => {
      socket.disconnect(); // Clean up the socket connection when component unmounts
    }; */
  }, []);

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
      "expiry_date": "01JUL23",
      "strike_price": "12",
      "change": "",
      "IV": 1.99
    },
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
  ]

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
        <div className="filter-container" style={{paddingBottom:'20px'}}>
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
