'use client'
import { useForm } from "react-hook-form";
import React from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  FormHelperText,
  Input,
  Button,
  Textarea,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spinner
} from "@chakra-ui/react";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateProductMutation } from '@/react-query/mutations';
import { toArray } from '@/utils/utils';
import { useQueryClient } from '@tanstack/react-query';

const addFormSchema = z.object({
  name: z.string().min(4, { message: 'name must be at least 4 characters' }),
  description: z.string().min(10, { message: 'description must be at least 10 characters' }),
  status: z.enum(['Draft', 'Listed', 'Archive'], {
    errorMap: (issue, ctx) => ({ message: 'Please select an option' })
  }),
  tags: z.string(),
  price: z.string(),
})

export type AddProductDTO = z.infer<typeof addFormSchema>;

export const AddProductForm = ({ onClose }: { onClose: () => void }) => {

  const { register, handleSubmit, formState: { errors } } = useForm<AddProductDTO>({
    resolver: zodResolver(addFormSchema),
  })

  const queryClient = useQueryClient()
  const { mutate: createMutate, isPending } = useCreateProductMutation()


  function onSubmit(data: AddProductDTO) {

    const tagsArray = toArray(data.tags)
    const tData = { ...data, tags: tagsArray }
    createMutate(tData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["allProducts"] })
        onClose();
      },
    })
  }



  return (
    <form onSubmit={handleSubmit(onSubmit)} className=' my-5 space-y-4'>

      <FormControl isInvalid={errors?.name}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          placeholder="name"
          {...register('name')}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors?.description}>
        <FormLabel htmlFor="name">Description</FormLabel>
        <Textarea
          id='description'
          placeholder='description'
          {...register('description')}
        />
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors?.status}>
        <FormLabel htmlFor='status'>Status</FormLabel>
        <Select id='status' placeholder='Select Status' {...register('status')}>
          <option value='Draft'>Draft </option>
          <option value='Listed'>Listed</option>
          <option value='Archive'>Archive</option>
        </Select>

        <FormErrorMessage>
          {errors.status && errors.status.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors?.tags}>
        <FormLabel htmlFor="tags">Tags</FormLabel>
        <Input
          id='tags'
          placeholder='tags'
          {...register('tags')}
        />
        <FormErrorMessage>
          {errors.tags && errors.tags.message}
        </FormErrorMessage>
        <FormHelperText>add multiple tags separated by comma</FormHelperText>
      </FormControl>

      <FormControl isInvalid={errors?.price}>
        <FormLabel htmlFor="price">Price</FormLabel>
        <NumberInput
          id='price'
          min={0.1}
          precision={2}
          defaultValue={'0.1'}
        >
          <NumberInputField {...register('price')} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <FormErrorMessage>
          {errors.price && errors.price.message}
        </FormErrorMessage>
      </FormControl>


      <Button colorScheme='blue' mt={10} mr={3} type='submit'>
        {isPending && <Spinner mx={2} />}
        Save
      </Button>
    </form>

  )

}

