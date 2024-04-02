import { useDeleteProductMutation } from '@/react-query/mutations'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Spinner,
} from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'


export function DeleteAlert({ isOpen, onClose, id }: {
  isOpen: boolean,
  onClose: () => void,
  id: string | undefined,
}) {
  const cancelRef = useRef()
  const queryClient = useQueryClient()

  const { mutate: deleteProductMutate, isPending } = useDeleteProductMutation()

  function onDelete() {
    deleteProductMutate(id!, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["allProducts"] })
        onClose();
      }
    })
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Delete Product
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can&apos;t undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={onDelete} ml={3}>
              {isPending && <Spinner mx={2} />}
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>

  )
}