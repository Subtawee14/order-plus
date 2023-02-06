import { v4 } from 'uuid';

interface Props<T> {
  columns: IColumn[];
  data: T[];
  rowKey: string;
}

interface IColumn {
  text: string;
  field: string;
  render?: (data: any) => React.ReactNode;
}

const Table = <T,>({ columns, data, rowKey }: Props<T>): JSX.Element => {
  const renderHeader = () => {
    return (
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column, index) => {
            if (index === 0) {
              return (
                <th
                  scope="col"
                  key={column.field}
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  {column.text}
                </th>
              );
            }

            return (
              <th
                scope="col"
                key={column.field}
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                {column.text}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  };

  const renderBody = () => {
    return (
      <tbody className="divide-y divide-gray-200 bg-white">
        {data.map((row) => (
          <tr key={(row[rowKey as keyof typeof row] as string) || v4()}>
            {columns.map((column) => {
              if (column.render) {
                return column.render(row);
              }

              return (
                <td
                  key={column.field}
                  className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                >
                  {row[column.field as keyof typeof row] as string}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              {renderHeader()}
              {renderBody()}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
