import { useFormik } from 'formik';
import Input from './Input';
import * as Yup from 'yup';
import Button from './Button';
import ErrorMessage from './ErrorMessage';
import { useState } from 'react';
import { useItems } from '@/hooks/useItems';
import { useModal } from '@/hooks/useModal';

interface IAddItemForm {
  id: string;
  name: string;
  price: number;
}

const validationSchema = Yup.object({
  id: Yup.string().required('Required'),
  name: Yup.string().required('Required'),
  price: Yup.number().required('Required'),
});

export default function AddItemForm() {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { addItem } = useItems();

  const { closeModal } = useModal();

  const handleAddItem = async ({ id, name, price }: IAddItemForm) => {
    setLoading(true);
    try {
      await addItem({ id, name, price });
      closeModal();
    } catch (error) {
      setIsError(true);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik<IAddItemForm>({
    initialValues: {
      id: '',
      name: '',
      price: 0,
    },
    onSubmit: async (values) => await handleAddItem(values),
    validationSchema,
  });

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white">
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700"
            >
              Item ID
            </label>
            <div className="mt-1">
              <Input
                onChange={formik.handleChange}
                value={formik.values.id}
                id="id"
                name="id"
              />
              {formik.errors?.id && formik.touched?.id && (
                <ErrorMessage message={formik?.errors?.id} />
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Item Name
            </label>
            <div className="mt-1">
              <Input
                onChange={formik.handleChange}
                value={formik.values.name}
                id="name"
                name="name"
              />
              {formik?.errors?.name && formik?.touched?.name && (
                <ErrorMessage message={formik?.errors?.name} />
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <div className="mt-1">
              <Input
                onChange={formik.handleChange}
                value={formik.values.price}
                id="price"
                name="price"
                type="number"
              />
              {formik?.errors?.price && formik?.touched?.price && (
                <ErrorMessage message={formik?.errors?.price} />
              )}
            </div>
          </div>

          {isError && (
            <ErrorMessage
              message={
                errorMessage || 'Something went wrong. Please try again.'
              }
            />
          )}

          <div>
            <Button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting || loading}
              loading={loading}
            >
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
