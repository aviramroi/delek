import { CREATE_TRANSACTION, GET_ORGANIZATION } from "lib/api";
import client from "lib/client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button, Label } from "flowbite-react";

import {
  GET_NUMBER_BY_USER_CODE,
  UPDATE_AMOUNT_LEFT,
  UPDATE_IN_USE_BY_ID,
} from "../../lib/api";

const App = ({ organization }: { organization: any }) => {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<number>();
  const [amountLeft, setAmountLeft] = useState<number>();
  const [user, setUser] = useState<number>();
  const [id, setId] = useState();
  const [delekCode, setDelekCode] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const state = localStorage.getItem("state");
      if (state) {
        const parsed = JSON.parse(state);
        setDelekCode(parsed.delekCode);
        setUser(parsed.user);
        setId(parsed.id);
      }
    }
  }, []);

  useEffect(() => {
    if (!organization?.id) {
      toast.error("משהו השתבש");
    }
  }, [organization]);

  const handleGetData = async () => {
    setLoading(true);
    const { data } = await client.query({
      query: GET_NUMBER_BY_USER_CODE,
      variables: {
        code,
        orgId: organization.id,
      },
    });

    if (data.users.length > 0) {
      setUser(data.users[0].id);
      if (data.delek.length > 0) {
        const localId = data.delek[0].id;
        setId(localId);
        const b = await client.mutate({
          mutation: UPDATE_IN_USE_BY_ID,
          variables: {
            id: localId,
          },
        });

        setLoading(false);
        setDelekCode(b.data.update_delek_by_pk.number);

        localStorage.setItem(
          "state",
          JSON.stringify({
            delekCode: b.data.update_delek_by_pk.number,
            id: localId,
            user: data.users[0].id,
          })
        );
      } else {
        toast.error("אופס נראה שאין כרטיסי דלק פנויים");
        setLoading(false);
      }
    } else {
      toast.error("קוד שגוי, יש לנסות שוב");
      setLoading(false);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    const data = await client.mutate({
      mutation: UPDATE_AMOUNT_LEFT,
      variables: {
        id: id,
        left: amountLeft,
      },
    });

    await client.mutate({
      mutation: CREATE_TRANSACTION,
      variables: {
        userId: user,
        delekId: id,
        orgId: organization.id,
        leftAmount: amountLeft,
      },
    });

    if (data.data.update_delek_by_pk.id) {
      toast.success("תודה על העדכון!");
      setLoading(false);
      setId(undefined);
      setAmountLeft(0);
      setDelekCode("");
      localStorage.removeItem("state");
    } else {
      toast.error("נראה שמשהו השתבש נסה שוב");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col gap-4">
      <h2 className=" mt-2 font-bold">דלק - {organization.name}</h2>
      <img
        src={
          "https://res.cloudinary.com/durts6blc/image/upload/v1664531982/uploads/Emblem_of_the_Hebrew_Scouts_Movement_in_Israel_i021pa.svg"
        }
        className=" w-40"
      />

      {delekCode ? (
        <div className="flex flex-col gap-2">
          <h1 className=" text-lg font-semibold bg-purple-100 p-2 rounded-md text-purple-700 tracking-wide text-center">
            {delekCode}
          </h1>
          <Label>הזנת סכום שנשאר</Label>
          <input
            value={amountLeft}
            onChange={(e) => {
              if (e.target.value.length > 4) {
              } else {
                setAmountLeft(e.target.value ? +e.target.value : undefined);
              }
            }}
            className="border rounded-md p-2 text-lg"
            placeholder="0000"
            type="number"
          />
          <Button disabled={!amountLeft || loading} onClick={handleFinish}>
            {loading ? "טוען..." : "סיים תדלוק"}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Label>הזנת קוד אישי</Label>
          <input
            value={code}
            onChange={(e) => {
              if (e.target.value.length > 4) {
              } else {
                setCode(e.target.value ? +e.target.value : undefined);
              }
            }}
            className="border rounded-md p-2 text-lg"
            placeholder="0000"
            type="number"
          />
          <Button disabled={!code || loading} onClick={handleGetData}>
            {loading ? "טוען..." : "קבלת קוד דלק"}
          </Button>

          <h1 className=" text-lg font-semibold">{delekCode}</h1>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async (ctx: any) => {
  const { query } = ctx;
  const { orgId } = query;

  const { data } = await client.query({
    query: GET_ORGANIZATION,
    variables: {
      id: +orgId,
    },
  });

  return {
    props: {
      organization: data.organizations.length > 0 ? data.organizations[0] : "",
    },
  };
};

export default App;
