import { useState } from "react";

function generateRandomNumber() {
  return Math.floor(Math.random() * 1000);
}

function App() {
  const [friendsList, setFriendsList] = useState([]);
  const [splitBillToggle, setSplitBillToggle] = useState(null);
  const [friendData, setFriendData] = useState();

  const pravatarGen = `https://i.pravatar.cc/${generateRandomNumber()}`;

  function handleFriendList(friend) {
    setFriendsList((currFriendList) => [friend, ...currFriendList]);
  }

  function handleSplitBillToggle(friend) {
    setSplitBillToggle((currState) =>
      currState === friend.id ? "" : friend.id,
    );
    setFriendData(friend);
  }

  function handleBillSplit(data) {
    const copyFriend = [...friendsList];
    const index = copyFriend.findIndex((friend) => friend.id === data.id);
    copyFriend[index].balance = data.balance;
    copyFriend[index].debtStatus = data.debtStatus;

    setFriendsList(copyFriend);
  }

  return (
    <>
      <div>
        <h2>Hi, Tomikimi</h2>
      </div>

      <div className="app">
        <ListofFriends
          friendsList={friendsList}
          splitBillToggle={splitBillToggle}
          onHandleSplitBillToggle={handleSplitBillToggle}
        >
          <AddFriend
            onAddFriend={handleFriendList}
            pravatar={pravatarGen}
          ></AddFriend>
        </ListofFriends>
        {splitBillToggle ? (
          <SplitBill
            friendData={friendData}
            handleBillSplit={handleBillSplit}
          ></SplitBill>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

function ListofFriends({
  friendsList,
  splitBillToggle,
  onHandleSplitBillToggle,
  children,
}) {
  const divStyle = {
    marginBottom: "1.5rem",
  };
  const [formToggle, setFormToggle] = useState(false);

  function handleSplitBillForm(data) {
    onHandleSplitBillToggle(data);
  }

  return (
    <>
      <div className="sidebar">
        {friendsList.length ? (
          <ul>
            {friendsList.map((friend) => (
              <li key={friend.id}>
                <img src={friend.image} alt="" />
                <h3>{friend.name}</h3>
                {Number(friend.balance) === 0 && (
                  <p>you and {friend.name} are even</p>
                )}
                {Number(friend.balance) !== 0 && (
                  <p
                    className={`${friend.debtStatus === true ? "green" : "red"}`}
                  >
                    {friend.debtStatus === true
                      ? `${friend.name} owes you ${Math.abs(friend.balance)} Naira.`
                      : `You owe ${friend.name} ${friend.balance} Naira`}
                  </p>
                )}

                <button
                  type="button"
                  className="button"
                  onClick={() => handleSplitBillForm(friend)}
                >
                  {friend.id === splitBillToggle ? `Close` : `Select`}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div style={divStyle}>
            <h1>Add Friends to your List 🧑🏽‍🤝‍👩🏽</h1>
          </div>
        )}

        {formToggle ? children : ""}
        <button className="button" onClick={() => setFormToggle(!formToggle)}>
          {formToggle ? `Close` : `Add Friend`}
        </button>
      </div>
    </>
  );
}

function AddFriend({ onAddFriend, pravatar }) {
  const [friend, setFriend] = useState("");

  function handleName(e) {
    setFriend(e.target.value);
  }

  function handleAddFriend(e) {
    e.preventDefault();

    if (!friend) return;

    const confirm = window.confirm(
      `Do you want to add ${friend} to your list...🤔`,
    );

    let data = {
      id: Date.now(),
      name: friend,
      image: pravatar,
      balance: 0,
    };

    if (confirm) {
      onAddFriend(data);
      setFriend("");
    }
  }
  return (
    <>
      <form className="form-add-friend" onSubmit={handleAddFriend}>
        <label htmlFor="friend">🧑🏽‍🤝‍👩🏽Friend name</label>
        <input name="friend" type="text" value={friend} onChange={handleName} />

        <label htmlFor="image">🖼️Image URL</label>
        <input name="image" type="text" value={pravatar} readOnly />

        <button className="button">Add</button>
      </form>
    </>
  );
}

function SplitBill({ friendData, handleBillSplit }) {
  // console.log(friendData);
  const [billValue, setBillValue] = useState();
  const [expenseValue, setExpenseValue] = useState();
  const [friendExpense, setFriendExpense] = useState();
  const [billPayer, setBillPayer] = useState("You");

  function handleBillValue(e) {
    setBillValue(e.target.value);
    setFriendExpense(e.target.value);
  }

  function handleExpenseValue(e) {
    setExpenseValue(e.target.value);
    setFriendExpense(billValue - e.target.value);
  }

  function handleSelectBillPayer(e) {
    setBillPayer(e.target.value);
  }

  function handleBillExpense(e) {
    e.preventDefault();

    let data;

    console.log(billPayer);

    if (billPayer === "You") {
      data = {
        ...friendData,
        balance: -friendExpense,
        debtStatus: true,
      };
    } else {
      data = { ...friendData, balance: expenseValue, debtStatus: false };
    }

    handleBillSplit(data);
  }
  return (
    <>
      <form className="form-split-bill" onSubmit={handleBillExpense}>
        <h2>split a bill with {friendData.name}</h2>
        <label htmlFor="billValue">💰Bill Value</label>
        <input
          name="billValue"
          type="number"
          value={billValue}
          onChange={handleBillValue}
        />

        <label htmlFor="expense">🧍🏽‍♂️Your Expense</label>
        <input
          name="expense"
          type="number"
          value={expenseValue}
          onChange={handleExpenseValue}
        />

        <label htmlFor="expense">🧑🏽‍🤝‍👩🏽{friendData.name + `s`} Expense</label>
        <input name="expense" disabled type="text" value={friendExpense} />

        <label htmlFor="expense">🤑Who is paying the bill?</label>
        <select value={billPayer} onChange={handleSelectBillPayer}>
          <option value="You">You</option>
          <option value={friendData.name}>{friendData.name}</option>
        </select>
        <button className="button">Split Bill</button>
      </form>
    </>
  );
}

export default App;
