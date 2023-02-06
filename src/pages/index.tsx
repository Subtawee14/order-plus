import Button from '@/components/Button';
import Table from '@/components/Table';
import { useItems } from '@/hooks/useItems';
import { useModal } from '@/hooks/useModal';
import Head from 'next/head';
import Modal from '@/components/Modal';
import EmptyState from '@/components/EmptyState';
import SearchBox from '@/components/SearchBox';

const columns = [
  {
    field: 'id',
    text: 'Item ID',
  },
  {
    field: 'name',
    text: 'Item Name',
  },
  {
    field: 'price',
    text: 'Price',
  },
];

export default function Home() {
  const { items } = useItems();

  const { openModal } = useModal();

  return (
    <div className="px-10 md:px-20 py-10">
      <Head>
        <title>Order Plus - Dashboard</title>
      </Head>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <SearchBox />
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Button buttonType="secondary" onClick={openModal}>
              Add Item
            </Button>
          </div>
        </div>
        {items.length ? (
          <Table columns={columns} data={items} rowKey="id" />
        ) : (
          <div className="w-full">
            <EmptyState title="No Items" message="No Items Available" />
          </div>
        )}
      </div>
      <Modal />
    </div>
  );
}
