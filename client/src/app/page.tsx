import Nav from '@/components/navbar';
import { ProductsList } from '@/components/products-list';
import { Heading } from '@chakra-ui/react';

export default function Home() {
  return (
    <main className="flex min-h-[150vh] flex-col items-center ">
      <Nav />
      <Heading mb={8}>
        Products E-Commerce
      </Heading>
      <ProductsList />
    </main>
  );
}
