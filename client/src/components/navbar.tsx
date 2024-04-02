'use client'

import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading,
} from '@chakra-ui/react'
import { AddProduct } from './add-product'
import { SearchInput } from './search-input'

interface Props {
  children: React.ReactNode
}

const NavBar = (props: Props) => {
  const { children } = props

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}>
      asdf
    </Box>
  )
}

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (

    <Box minW='100%' mb={10} position="static" bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box>
          <Heading fontFamily='cursive'>
            PE
          </Heading>
        </Box>
        <Box >
          <SearchInput />
        </Box>
        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7}>

            <AddProduct />
          </Stack>
        </Flex>
      </Flex>
    </Box>

  )
}