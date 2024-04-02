'use client'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { AddProductForm } from './forms/add-product'

export const AddProduct = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button colorScheme='blue' onClick={onOpen}>Add Product</Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddProductForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
