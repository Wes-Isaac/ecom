'use client'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { UpdateProductForm } from './forms/update.product'

export const UpdateProduct = ({ isModalOpen, onModalClose, id }: {
  isModalOpen: boolean,
  onModalClose: () => void,
  id: string | undefined,
}) => {

  return (


    <Modal isCentered isOpen={isModalOpen} onClose={onModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update a Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <UpdateProductForm id={id!} onClose={onModalClose} />
        </ModalBody>
      </ModalContent>
    </Modal>

  )
}
