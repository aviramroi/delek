import { Button, Label } from "flowbite-react";
import { GET_ORG_FULL_DATA, LOGIN } from "lib/api";
import client from "lib/client";
import React, { useEffect, useState } from "react";
import cx from "classnames";
import { toast } from "react-toastify";

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

  useEffect(() => {
    (async () => {
      const { data } = await client.query({
        query: GET_ORG_FULL_DATA,
        variables: {
          id: user.id,
        },
      });

      if (data.organizations.length > 0) {
        setCards(data.organizations[0].cards);
        setUsers(data.organizations[0].users);
      } else {
        toast.error("משהו השתבש");
      }
    })();
  }, []);

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
      {tab === "cards" && <Cards cards={cards} />}
      {tab === "users" && <Users users={users} />}
    </div>
  );
};

const Users = ({ users }: { users: any[] }) => {
  return (
    <div>
      {users.map((u) => {
        return (
          <div key={u.id} className=" hover:bg-gray-100 p-2 ">
            {u.name} - {u.code}
          </div>
        );
      })}
    </div>
  );
};

const Cards = ({ cards }: { cards: any[] }) => {
  return (
    <div className=" h-64 overflow-y-scroll flex-grow">
      {cards.map((c) => {
        return (
          <div key={c.id} className=" hover:bg-gray-100 p-2">
            {c.number} - {c.inUse ? "בשימוש" : "לא בשימוש"} - {c.leftAmount}
          </div>
        );
      })}
    </div>
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
