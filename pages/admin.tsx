import { Button, Label, Modal } from "flowbite-react";
import {
  CREATE_DELEK_CARD,
  CREATE_USER,
  GET_ORG_FULL_DATA,
  LOGIN,
} from "lib/api";
import client from "lib/client";
import React, { useEffect, useState } from "react";
import cx from "classnames";
import { toast } from "react-toastify";
import { useQuery } from "@apollo/client";

const Login = ({ setUser }: { setUser: (org: any) => void }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { data } = await client.query({
      query: LOGIN,
      variables: {
        password,
      },
    });

    if (data.organizations.length > 0) {
      localStorage.setItem("org", JSON.stringify(data.organizations[0]));
      setUser(data.organizations[0]);
    } else {
      toast.error("סיסמה שגויה, יש לנסות שוב");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-3 ">
      <Label>הזנת סיסמה</Label>
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="border rounded-md p-2 text-lg"
      />
      <Button disabled={!password || loading} onClick={handleLogin}>
        {loading ? "טוען..." : "התחברות"}
      </Button>
    </div>
  );
};

const Dashboard = ({ user }: { user: any }) => {
  const [tab, setTab] = useState<"users" | "cards">("cards");
  const [cards, setCards] = useState([]);
  const [users, setUsers] = useState([]);
  const { refetch, data } = useQuery(GET_ORG_FULL_DATA, {
    variables: { id: user.id },
  });

  useEffect(() => {
    if (data) {
      if (data.organizations.length > 0) {
        setCards(data.organizations[0].cards);
        setUsers(data.organizations[0].users);
      } else {
        toast.error("משהו השתבש");
      }
    }
  }, [data]);

  return (
    <div className=" flex flex-col mt-4 flex-grow">
      <div className="flex gap-2 border-b pb-1">
        <button
          onClick={() => setTab("cards")}
          className={cx(
            " hover:bg-gray-300 rounded-md p-2 outline-none focus:outline-none",
            {
              " bg-gray-400": tab == "cards",
            }
          )}
        >
          כרטיסי דלק
        </button>
        <button
          onClick={() => setTab("users")}
          className={cx(
            "hover:bg-gray-300 rounded-md p-2 outline-none focus:outline-none",
            {
              " bg-gray-400": tab == "users",
            }
          )}
        >
          משתמשים
        </button>
      </div>
      {tab === "cards" && (
        <Cards cards={cards} orgId={user.id} refetch={refetch} />
      )}
      {tab === "users" && (
        <Users users={users} orgId={user.id} refetch={refetch} />
      )}
    </div>
  );
};

const Users = ({
  users,
  orgId,
  refetch,
}: {
  users: any[];
  orgId: number;
  refetch: () => void;
}) => {
  const [isShowing, setShowing] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState<number>();

  const handleNewCard = async () => {
    const data = await client.mutate({
      mutation: CREATE_USER,
      variables: {
        code: code,
        name: name,
        orgId: orgId,
      },
    });

    if (data.data) {
      toast.success("נוצר בהצלחה");
      await refetch();
    } else {
      toast.error("אופס.. משהו השתבש נסה שוב");
    }
    setShowing(false);
  };

  return (
    <>
      <Modal show={isShowing} onClose={() => setShowing(false)}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-3">
            <h1>הוספת משתמשים</h1>
            <div className="flex flex-col gap-2 ">
              <Label>הזנת שם</Label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="border rounded-md p-2 text-lg"
                placeholder="שם מלא"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <Label>הזנת קוד</Label>
              <input
                value={code}
                onChange={(e) => {
                  setCode(+e.target.value);
                }}
                placeholder="קוד 4 ספרות"
                className="border rounded-md p-2 text-lg"
                type="number"
              />
            </div>
            <Button onClick={handleNewCard}>יצירה</Button>
          </div>
        </Modal.Body>
      </Modal>
      <div>
        {users.map((u) => {
          return (
            <div key={u.id} className=" hover:bg-gray-100 p-2 ">
              {u.name} - {u.code}
            </div>
          );
        })}
      </div>
      <div className=" mt-2 mb-2">
        <Button onClick={() => setShowing(true)}>צור חדש</Button>
      </div>
    </>
  );
};

const Cards = ({
  cards,
  orgId,
  refetch,
}: {
  cards: any[];
  orgId: unknown;
  refetch: () => void;
}) => {
  const [isShowing, setShowing] = useState(false);
  const [delek, setDelek] = useState("");
  const [amount, setAmount] = useState<string>();

  const handleNewCard = async () => {
    const data = await client.mutate({
      mutation: CREATE_DELEK_CARD,
      variables: {
        leftAmount: amount,
        inUse: false,
        number: delek,
        orgId: orgId,
      },
    });

    if (data.data) {
      toast.success("נוצר בהצלחה");
      await refetch();
    } else {
      toast.error("אופס.. משהו השתבש נסה שוב");
    }
    setShowing(false);
  };

  return (
    <>
      <Modal show={isShowing} onClose={() => setShowing(false)}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-3">
            <h1>הוספת כרטיס דלק</h1>
            <div className="flex flex-col gap-2 ">
              <Label>הזנת קוד קשפז</Label>
              <input
                value={delek}
                onChange={(e) => {
                  setDelek(e.target.value);
                }}
                className="border rounded-md p-2 text-lg"
                placeholder="קוד דלק"
                type="number"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <Label>הזנת סכום</Label>
              <input
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                placeholder="סכום"
                className="border rounded-md p-2 text-lg"
                type="number"
              />
            </div>
            <Button onClick={handleNewCard}>יצירה</Button>
          </div>
        </Modal.Body>
      </Modal>
      <div className=" h-64 overflow-y-scroll flex-grow">
        {cards.map((c) => {
          return (
            <div key={c.id} className=" hover:bg-gray-100 p-2">
              {c.number} - {c.inUse ? "בשימוש" : "לא בשימוש"} - {c.leftAmount}
            </div>
          );
        })}
      </div>
      <div className=" mt-2 mb-2">
        <Button onClick={() => setShowing(true)}>צור חדש</Button>
      </div>
    </>
  );
};

const Admin = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem("org");
    if (u) {
      setUser(JSON.parse(u));
    }
  }, []);

  if (!user) {
    return <Login setUser={setUser} />;
  }
  return <Dashboard user={user} />;
};

export default Admin;
