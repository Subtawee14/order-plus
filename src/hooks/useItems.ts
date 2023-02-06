import { db } from '@/config/firebase';
import {
  getDocs,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { useSearch } from './useSearch';

interface Item {
  id: string;
  name: string;
  price: number;
}

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const { search, setSearch } = useSearch();

  const fetchItems = useCallback(async () => {
    await getDocs(collection(db, 'items')).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        id: doc.data().id,
        name: doc.data().name,
        price: doc.data().price,
        createdAt: doc.data().createdAt,
      }));
      setItems(newData);
    });
  }, []);

  const addItem = async (item: Item) => {
    try {
      if (await checkIdItemAlreadyExistOnFireStore(item.id)) {
        throw new Error('Item ID already exist');
      }
      await addDoc(collection(db, 'items'), {
        ...item,
        createdAt: new Date(),
      });
    } catch (e) {
      console.error('Error adding document: ', e);
      throw e;
    }
  };

  const checkIdItemAlreadyExistOnFireStore = async (id: string) => {
    const querySnapshot = await getDocs(collection(db, 'items'));
    const result = querySnapshot.docs.find((doc) => doc.data().id === id);
    return !!result;
  };

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    const q = query(collection(db, 'items'), orderBy('createdAt', 'desc'));

    onSnapshot(q, (doc) => {
      const newData = doc.docs.map((doc) => ({
        id: doc.data().id,
        name: doc.data().name,
        price: doc.data().price,
      }));

      const filteredData = search
        ? newData.filter(
            (item) =>
              item.name.toLowerCase().match(search.toLowerCase()) ||
              item.id.toLowerCase().match(search.toLowerCase())
          )
        : newData;

      setItems(filteredData);
    });
  }, [search]);

  return { items, fetchItems, addItem, search, setSearch };
};
