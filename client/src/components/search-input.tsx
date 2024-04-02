import useDebounce from '@/hook/use-debounce'
import { useSearchProductsQuery } from '@/react-query/query'
import { Badge, Box, Divider, Flex, HStack, Heading, Input, Spinner, Text, VStack } from '@chakra-ui/react'
import { useCallback, useState } from 'react'

export const SearchInput = () => {

  const [query, setQuery] = useState<string>('')
  const debouncedSearch = useDebounce(query, 500);
  const { data: products, isPending, isFetching } = useSearchProductsQuery(debouncedSearch);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
  }, []);


  return (
    <Box position='relative' >
      <Input
        bgColor='white'
        borderRadius={20}
        minW="150%"
        type="text"
        placeholder="Search by tag/name"
        value={query}
        onChange={handleInputChange}
      />
      <VStack position='absolute' zIndex={5} width='150%' mt={0.5} bg={'white'} >

        {
          (isPending && isFetching) ?
            <Spinner my={10} size='lg' color='blue.500' /> :
            products?.data?.map(result => (
              <>
                <Box width="100%" p={5} className=' space-y-4' key={result?.name}>
                  <Flex justifyContent={'space-between'} alignItems={'center'}>
                    <Heading size='md'>{result?.name} </Heading>
                    <Heading size='sm'> ${result?.price}</Heading>
                  </Flex>
                  <Badge>
                    {result?.status}
                  </Badge>
                  <HStack mb='5'>

                    {
                      result.tags?.map(tag => (
                        <Badge py={1} px={2} borderRadius={4} mx={2} key={tag?.id}>{tag?.name}</Badge>
                      ))
                    }
                  </HStack>
                </Box>
                <Divider orientation='horizontal' />
              </>
            ))}
      </VStack>
    </Box>
  )
}
