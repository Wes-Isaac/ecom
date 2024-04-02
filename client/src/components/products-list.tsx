'use client'

import { useGetProductsQuery } from '@/react-query/query'
import { Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Flex, Grid, GridItem, HStack, Heading, Text, VStack, useDisclosure } from '@chakra-ui/react'
import { DeleteAlert } from './Alert'
import { useState } from 'react'
import { UpdateProduct } from './update.product'

export const ProductsList = () => {
  const { data: products } = useGetProductsQuery()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()

  const [id, setId] = useState<string>()

  return (
    <>
      <UpdateProduct isModalOpen={isModalOpen} onModalClose={onModalClose} id={id} />
      <DeleteAlert isOpen={isOpen} onClose={onClose} id={id} />
      <Grid templateColumns='repeat(3, 1fr)' px={20} gap={6}>
        {
          products?.data?.map((product) => (
            <GridItem key={product.id}>
              <Card minH='sm' >

                <CardHeader>

                  <Flex justifyContent={'space-between'} alignItems={'center'}>
                    <Heading size='lg'>{product.name}</Heading>
                    <Heading size='md'>${product.price}</Heading>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Badge>
                    {product.status}
                  </Badge>
                  <Text>
                    {product.description}
                  </Text>
                </CardBody>
                <CardFooter>
                  <VStack>

                    <HStack mb='5'>

                      {
                        product.tags?.map(tag => (
                          <Badge py={1} px={2} borderRadius={4} mx={2} key={tag?.id}>{tag?.name}</Badge>
                        ))
                      }
                    </HStack>
                    <HStack>
                      <Button colorScheme='purple'
                        onClick={() => {
                          setId(product.id)
                          onModalOpen()
                        }}>Update</Button>
                      <Button colorScheme='red' onClick={() => {
                        setId(product.id)
                        onOpen()

                      }}>Delete</Button>
                    </HStack>
                  </VStack>

                </CardFooter>
              </Card>

            </GridItem>
          )

          )
        }

      </Grid>
    </>

  )
}