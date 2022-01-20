import React from 'react';
import { Flex, Spacer, Text, Box, Image } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import Navbar from './Navbar';
import { type } from 'os';

type Price = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  market_cap: number;
};

const getMarket = async () => {
  const URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=IDR&order=market_cap_desc&per_page=10&page=1&sparkline=false';

  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error('fetching eror');
  }
  return await response.json();
};
const formatNUmber = (num: number) => {
  return Intl.NumberFormat('id-id').format(num);
};

function CryptoMarket() {
  const { data, isError, isLoading, isFetching, isSuccess } = useQuery('market', getMarket);
  return (
    <Box className="m-10">
      <Navbar />
      <Box className="items-baseline">
        <Box className="flex justify-between border-b-[1px] border-gray-300">
          <Text className=" p-2 w-[25%]">Coin</Text>
          <Text className=" p-2 flex-1">Harga</Text>
          <Text className=" p-2 flex-1">24H % Change</Text>
          <Text className=" p-2 flex-1 text-right">Total Volume</Text>
          <Text className=" p-2 flex-1 text-right">Market Cap</Text>
        </Box>
        <div>
          {isSuccess &&
            data?.map((price: Price) => {
              return (
                <div>
                  <Box className="flex justify-between border-b-[1px] border-gray-200">
                    <Box className="w-[25%] items-center flex p-2">
                      <Image boxSize="24px" src={price.image} />
                      <Text className="w-[50%] p-2">{price.id}</Text>
                    </Box>

                    <Text className="flex-1 p-2">Rp{formatNUmber(price.current_price)}</Text>
                    <Text className="flex-1 p-2">{price.price_change_percentage_24h}</Text>
                    <Text className="flex-1 p-2 text-right">{formatNUmber(price.total_volume)}</Text>
                    <Text className="flex-1 p-2 text-right">{formatNUmber(price.market_cap)}</Text>
                  </Box>
                </div>
              );
            })}
        </div>
      </Box>
    </Box>
  );
}

export default CryptoMarket;
