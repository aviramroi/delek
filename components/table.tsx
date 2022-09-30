import { Button } from 'flowbite-react';
import { Fragment } from 'react';

const labels = {
  fullName: 'שם מלא',
  description: 'סיבה',
  tribe: 'שבט',
  actions: {
    approve: 'אשר',
    cancel: 'מחק',
  },
};

export const Table = ({ data }: { data: any[] }) => {
  return (
    <div className="flex flex-col gap-3">
      <table>
        <thead className="mb-1">
          <tr className=" bg-gray-100 p-1">
            <th className="p-1 text-right">{labels.fullName}</th>
            <th className=" p-1 text-right">{labels.description}</th>
            <th className=" p-1 text-right">{labels.tribe}</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return (
              <tr key={row.id} className=" gap-2">
                {Object.keys(row).map((key) => {
                  if (!['id', 'createdAt'].includes(key)) {
                    return (
                      <td key={key} className=" border px-2">
                        {typeof row[key] === 'object' ? (
                          <div>{row[key].name}</div>
                        ) : (
                          <div>{row[key]}</div>
                        )}
                      </td>
                    );
                  }
                  return <Fragment key={row.id} />;
                })}
                <td className=" flex justify-center">
                  <Button color="success">{labels.actions.approve}</Button>
                </td>
                <td className=" justify-center">
                  <Button outline={true} color="failure">
                    {labels.actions.cancel}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
